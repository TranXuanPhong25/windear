import Tag from "@/types/Tags";

export default function extractTags(tags: { tag: Tag }[], category: string) {
   return tags
      .filter((tag: { tag: Tag }) => tag.tag.tag_category.category === category).
      map((item: { tag: Tag }) => item.tag).slice(0, 10) ;
}
