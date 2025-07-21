import { contentfulClient } from "../lib/contentful";
import type { EntryFieldTypes } from "contentful";
import type {
  TeamMember,
  Offer,
  Wisdom,
  Partner,
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
    offer: EntryFieldTypes.Array<string>;
    image?: {
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

interface CFWisdom {
  contentTypeId: "wisdom";
  fields: {
    author: EntryFieldTypes.Text;
    quote: EntryFieldTypes.Text;
  };
}

interface CFPartner {
  contentTypeId: "associates";
  fields: {
    name: EntryFieldTypes.Text;
    link: EntryFieldTypes.Text;
  };
}
interface CFConfig {
  contentTypeId: "config";
  fields: {
    name: EntryFieldTypes.Text;
    data: EntryFieldTypes.Object;
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
      params: { slug: slug(item.fields.name) },
      props: {
        slug: slug(item.fields.name),
        name: item.fields.name,
        title: item.fields.title,
        info: item.fields.info,
        offer: item.fields.offer, // Fehler: "offer" ist nicht im Typ CFTeamMember definiert
        image: item.fields.image
          ? {
              url: item.fields.image.fields.file.url,
              description: item.fields.image.fields.description,
            }
          : undefined,
      },
    };
    return member;
  });

  return members;
};

export const getWisdoms = async () => {
  const entries = await contentfulClient.getEntries<CFWisdom>({
    content_type: "wisdom",
  });
  const wisdoms = entries.items.map((item: CFWisdom) => {
    const wisdom = {
      contentTypeId: item.sys.contentType.sys.id,
      props: {
        author: item.fields.author,
        quote: item.fields.quote,
      },
    }
    return wisdom;
  })
  return wisdoms;
};


export const getPartners = async () => {
  const entries = await contentfulClient.getEntries<CFPartner>({
    content_type: "associates",
  });
  const partners = entries.items.map((item: CFPartner) => {
    const partner = {
      contentTypeId: item.sys.contentType.sys.id,
      props: {
        name: item.fields.name,
        link: item.fields.link,
      },
    }
    return partner;
  })
  return partners;
};

export const getOffers = async () => {
  const entries = await contentfulClient.getEntries<CFOffer>({
    content_type: "offer",
  });

  const offers: Offer[] = entries.items.map((item: CFOffer) => {
    const offer: Offer = {
      contentTypeId: item.sys.contentType.sys.id,
      params: { slug: slug(item.fields.name) },
      props: {
        slug: slug(item.fields.name),
        name: item.fields.name,
        intro: item.fields.intro,
        text: item.fields.text,
        image: item.fields.image
          ? {
              url: item.fields.image.fields.file.url,
              description: item.fields.image.fields.description,
            }
          : undefined,
        logo: item.fields.logoDachverband
          ? {
              url: item.fields.logoDachverband.fields.file.url,
              description: item.fields.logoDachverband.fields.description,
            }
          : undefined,
        link: item.fields.urlDachverband
          ? {
              url: item.fields.urlDachverband,
            }
          : undefined,
      },
    };
    return offer;
  });
  return offers;
};

export const getPages = async () => {
  const entries = await contentfulClient.getEntries<CFPage>({
    content_type: "page",
  });

  const pages: Page[] = entries.items.map((item: CFPage) => {
    const page: Page = {
      contentTypeId: item.sys.contentType.sys.id,
      params: { slug: slug(item.fields.name) },
      props: {
        slug: slug(item.fields.name),
        name: item.fields.name,
        text: item.fields.text,
        info: item.fields.info,
        image: item.fields.image
          ? {
              url: item.fields.image.fields.file.url,
              description: item.fields.image.fields.description,
            }
          : undefined,
      },
    };
    return page;
  });
  return pages;


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
