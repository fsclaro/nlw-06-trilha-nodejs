import { TagsRepositories } from "../repositories/TagsRepositories";
import { getCustomRepository } from "typeorm";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Incorrect name");
    }

    const tagAlredyExists = await tagsRepository.findOne({ name });

    if (tagAlredyExists) {
      throw new Error("Tag alredy exists");
    }

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
