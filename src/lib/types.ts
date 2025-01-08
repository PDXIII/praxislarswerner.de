import type { EntryFieldTypes } from "contentful";

export type TeamMember = {
  contentTypeId: "teamMember",
  fields: {
    name: EntryFieldTypes.Text,
    title: EntryFieldTypes.Text,
    info: EntryFieldTypes.RichText,
    image: {
        fields: {
            description: EntryFieldTypes.Text, 
            file: { 
                url: EntryFieldTypes.Text
            }
        }
    }
  }
}

export type Offer = {
  contentTypeId: "offer",
  fields: {
    name: EntryFieldTypes.Text,
    intro: EntryFieldTypes.RichText,
    text: EntryFieldTypes.RichText,
    image?: {
        fields: { 
         file: { 
           url: EntryFieldTypes.Text
         }
       }
     }
  }
}

export type Page = {
  contentTypeId: "page",
  fields: {
    name: EntryFieldTypes.Text,
    text: EntryFieldTypes.Text,
    info: EntryFieldTypes.RichText,
    image?: {
        fields: { 
         file: { 
           url: EntryFieldTypes.Text
         }
       }
     }
  }
}

