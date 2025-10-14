// src/lib/types.ts
import type { EntryFieldTypes } from "contentful";

// ------------------------------
// Team-Mitglied
// ------------------------------
export type TeamMember = {
  contentTypeId: "teamMember";
  params: { slug: string };
  props: {
    name: string;
    order: number;
    title: string;
    bio: EntryFieldTypes.RichText;
    info: EntryFieldTypes.RichText;
    offer: string[];
    image?: {
      url: string;
      description: string;
    };
  };
};

// ------------------------------
// Angebot
// ------------------------------
export type Offer = {
  contentTypeId: "offer";
  params: { slug: string };
  props: {
    name: string;
    order: number;
    info: EntryFieldTypes.RichText;
    text: EntryFieldTypes.RichText;
    image?: {
      url: string;
    };
    logo?: {
      url: string;
    };
    link?: {
      url: string;
    };
  };
};

// ------------------------------
// Seite
// ------------------------------
export type Page = {
  contentTypeId: "page";
  params: { slug: string };
  props: {
    name: string;
    text: EntryFieldTypes.RichText;
    info: EntryFieldTypes.RichText;
    image?: {
      url: string;
      description: string;
    };
  };
};

// ------------------------------
// Partner
// ------------------------------
export type Partner = {
  contentTypeId: "associates";
  props: {
    name: string;
    link: string;
  };
};

// ------------------------------
// Weisheit
// ------------------------------
export type Wisdom = {
  contentTypeId: "wisdom";
  props: {
    author: string;
    quote: string;
  };
};

// ------------------------------
// Konfiguration
// ------------------------------
export type Config = {
  contentTypeId: "config";
  name: string;
  data: EntryFieldTypes.Object;
};

// ------------------------------
// LandingPage
// ------------------------------
export type LandingPage = {
  contentTypeId: "landingPage";
  params: { slug: string };
  props: {
    name: string;
    introText: EntryFieldTypes.RichText;
    info: EntryFieldTypes.Text;
    contactText: EntryFieldTypes.RichText;
  };
};
