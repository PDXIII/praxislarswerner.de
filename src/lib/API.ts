
import { contentfulClient } from "../lib/contentful";
import type { EntryFieldTypes } from "contentful";

interface TeamMember {
  contentTypeId: "teamMember",
  fields: {
	name: EntryFieldTypes.Text,
    title: EntryFieldTypes.Text,
    info: EntryFieldTypes.RichText,
  }
}

interface Offer {
  contentTypeId: "offer",
  fields: {
    name: EntryFieldTypes.Text,
    intro: EntryFieldTypes.RichText,
    text: EntryFieldTypes.RichText
  }
}

interface Page {
  contentTypeId: "page",
  fields: {
    name: EntryFieldTypes.Text,
    text: EntryFieldTypes.Text,
    info: EntryFieldTypes.RichText,
  }
}


export const getTeamMembers = async () => {
  const entries = await contentfulClient.getEntries<TeamMember>({
    content_type: "teamMember",
  });
  return entries.items;
}
export const getOffers = async () => {
  const entries = await contentfulClient.getEntries<Offer>({
    content_type: "offer",
  });
  return entries.items;
}
export const getPages = async () => {
  const entries = await contentfulClient.getEntries<Page>({
    content_type: "page",
  });
  return entries.items;
}

