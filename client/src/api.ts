import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

/*export const getProductCategories = async() =>{
    const res = await axios.get(
        `${API_URL}/categories?populate[products][populate]=Image`
    );
    return res.data.data;
};*/

export const getProductCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`, {
    params: {
      'fields[0]': 'id',
      'fields[1]': 'name',
      'fields[2]': 'slug',

      'populate[products][fields][0]': 'id',
      'populate[products][fields][1]': 'Name',
      'populate[products][fields][2]': 'slug',
      'populate[products][fields][3]': 'StoreName',
      'populate[products][fields][4]': 'Likes',
      'populate[products][fields][5]': 'Views',
      'populate[products][fields][6]': 'Description',
      'populate[products][fields][7]': 'ExternalUrl',
      'populate[products][fields][8]': 'SwiftXREmbed',

      'populate[products][populate][Image][fields][0]': 'url',
      'populate[products][populate][Image][fields][1]': 'name',
    },
  });
  return res.data.data;
};


/*export const getProductSlug = async (slug: string) =>{
    const res = await axios.get(
        `${API_URL}/products?filters[slug][$eq]=${slug}&populate=Image`
    );
    return res.data.data[0]
}*/

export const getProductSlug = async (slug: string) => {
  const res = await axios.get(`${API_URL}/products`, {
    params: {
      'filters[slug][$eq]': slug,

      'fields[0]': 'id',
      'fields[1]': 'Name',
      'fields[2]': 'slug',
      'fields[3]': 'StoreName',
      'fields[4]': 'Likes',
      'fields[5]': 'Views',
      'fields[6]': 'Description',
      'fields[7]': 'ExternalUrl',
      'fields[8]': 'SwiftXREmbed',

      'populate[Image][fields][0]': 'url',
      'populate[Image][fields][1]': 'name',
    },
  });
  return res.data.data[0];
};


/*export const getProducts = async () => {
  const res = await axios.get(
    `${API_URL}/products?populate=Image`
  );
  return res.data.data;
};*/

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`, {
    params: {
      'fields[0]': 'id',
      'fields[1]': 'Name',
      'fields[2]': 'slug',
      'fields[3]': 'StoreName',
      'fields[4]': 'Likes',
      'fields[5]': 'Views',
      'fields[6]': 'Description',
      'fields[7]': 'ExternalUrl',
      'fields[8]': 'SwiftXREmbed',

      'populate[Image][fields][0]': 'url',
      'populate[Image][fields][1]': 'name',
    },
  });
  return res.data.data;
};


/*export const getCategories = async () => {
  const res = await axios.get(
    `${API_URL}/categories?populate[Icon]=true&populate[products][populate]=Image`
  );
  return res.data.data;
};*/
export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`, {
    params: {
      'fields[0]': 'id',
      'fields[1]': 'name',
      'fields[2]': 'slug',

      'populate[Icon][fields][0]': 'url',
      'populate[Icon][fields][1]': 'name',

      'populate[products][fields][0]': 'id',
      'populate[products][fields][1]': 'Name',
      'populate[products][fields][2]': 'slug',
      'populate[products][fields][3]': 'StoreName',
      'populate[products][fields][4]': 'Likes',
      'populate[products][fields][5]': 'Views',
      'populate[products][fields][6]': 'Description',
      'populate[products][fields][7]': 'ExternalUrl',
      'populate[products][fields][8]': 'SwiftXREmbed',

      'populate[products][populate][Image][fields][0]': 'url',
      'populate[products][populate][Image][fields][1]': 'name',
    },
  });
  return res.data.data;
};



