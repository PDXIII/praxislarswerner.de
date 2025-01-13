import { contentfulClient } from "../lib/contentful";
import type { EntryFieldTypes } from "contentful";
import type {
  TeamMember,
  Offer,
  Page,
  Config,
  LandingPage,
} from "../lib/types";
import { slug } from "github-slugger";

interface CFTeamMember {
  contentTypeId: "teamMember";
  fields: {
    name: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    info: EntryFieldTypes.RichText;
    image: {
      fields: {
        description: EntryFieldTypes.Text;
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
  };
}

interface CFOffer {
  contentTypeId: "offer";
  fields: {
    name: EntryFieldTypes.Text;
    intro: EntryFieldTypes.RichText;
    text: EntryFieldTypes.RichText;
    image?: {
      fields: {
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
    logoDachverband?: {
      fields: {
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
    urlDachverband?: EntryFieldTypes.Text;
  };
}

interface CFPage {
  contentTypeId: "page";
  fields: {
    name: EntryFieldTypes.Text;
    text: EntryFieldTypes.Text;
    info: EntryFieldTypes.RichText;
    image?: {
      fields: {
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
  };
}

interface CFConfig {
  contentTypeId: "config";
  fields: {
    name: EntryFieldTypes.Text;
    data: EntryFieldTypes.Object;
  };
}

interface CFLandingPage {
  contentTypeId: "landingPage";
  fields: {
    name: EntryFieldTypes.Text;
    introText: EntryFieldTypes.RichText;
    contactText: EntryFieldTypes.RichText;
  };
}
export const getTeamMembers = async () => {
  const entries = await contentfulClient.getEntries<CFTeamMember>({
    content_type: "teamMember",
  });
  const members: TeamMember[] = entries.items.map((item: CFTeamMember) => {
    const member: TeamMember = {
      contentTypeId: item.sys.contentType.sys.id,
      slug: slug(item.fields.name),
      name: item.fields.name,
      title: item.fields.title,
      info: item.fields.info,
      image: {
        url: item.fields.image.fields.file.url,
        description: item.fields.image.fields.description,
      }
    }
    return member;
  });

  return members;
};
export const getOffers = async () => {
  const entries = await contentfulClient.getEntries<CFOffer>({
    content_type: "offer",
  });
  return entries.items;
};
export const getPages = async () => {
  const entries = await contentfulClient.getEntries<CFPage>({
    content_type: "page",
  });
  return entries.items;
};

export const getLandingPage = async () => {
  const page = await contentfulClient.getEntry<CFLandingPage>(
    "xln036ds3i7CCHBhvaMVA"
  );
  return page.fields;
};
export const getPageByID = async (id: string) => {
  const page = await contentfulClient.getEntry<CFPage>(id);
  return page.fields;
};

export const getConfigByID = async (id: string) => {
  const config = await contentfulClient.getEntry<CFConfig>(id);
  return config.fields;
};
