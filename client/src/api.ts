import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getProductCategories = async() =>{
    const res = await axios.get(
        `${API_URL}/categories?populate[products][populate]=Image`
    );
    return res.data.data;
};

export const getProductSlug = async (slug: string) =>{
    const res = await axios.get(
        `${API_URL}/products?filters[slug][$eq]=${slug}&populate=Image`
    );
    return res.data.data[0]
}