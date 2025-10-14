

export type TeamMember = {
  contentTypeId: "teamMember",
  params: { slug: string },
  props:{
    // slug: string,
    name: string,
    oder: number,
    title: string,
    bio: any,
    info:any,
    offer: string[],
    image: {
      url: string,
      description: string
    },
  }
}

export type Offer = {
  contentTypeId: "offer",
  params: { slug: string },
  props: {
    // slug: string,
    name: string,
    oder: number,
    info:any,
    text: any,
    image?: {
      url: string,
      description?: string
    }
    logo?: {
      url: string,
      description?: string,
    }
    link?: {
      url: string,
    }
  }
}


export type Page = {
  contentTypeId: "page",
  params: { slug: string} ,
  props: {
    // slug: string,
    name: string,
    text: any,
    info:any,
    image?: {
      url: string,
     description: string,
    },
  }
}

export type Config = {
  contentTypeId: "config",
  name: string,
  data: any,
}

export type Wisdom = {
  contentTypeId: "wisdom",
  props: {
    author: string,
    quote: string,
  }
}

export type Partner = {
  contentTypeId: "associates",
  props: {
    name: string,
    link: string
  }
}

export type LandingPage = {
  contentTypeId: "landingPage",
  params: { slug: string },
  props: {
    // slug: string,
    name: string,
    introText: any,
    info:any,
    contactText: any,
  }
}