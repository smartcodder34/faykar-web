import { http } from "@/lib/http";


export const createProduct = async (data: any) => {
  try {
    const res = await http.post("/product/create", data, {
      headers: {
        "Content-Type": "multipart/form-data", // This is important for form data
      },
      transformRequest: () => {
        // Return the form data as it is
        return data;
      },
    });
    console.log(res.data, "createProduct");
    return res.data;
  } catch (error) {
    console.error("Error create Product :", error);
    throw error;
  }
};

export const productCategories = async () => {
  try {
    const res = await http.get("/categories");
    return res.data;
  } catch (error) {
    console.error("product Categories", error);
    throw error;
  }
};


export const subProductCategories = async (data:any) => {
  
  try {
    const res = await http.get(`/subcategories/${data}`);
    return res.data;
  } catch (error) {
    console.error("sub product Categories", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const res = await http.get(`/product/customers/product`);
    return res.data;
  } catch (error) {
    console.error("get product", error);
    throw error;
  }
};

export const likeProduct = async (data:any) => {
  try {
    const res = await http.get(`/product/${data}/like`);
    return res.data;
  } catch (error) {
    console.error("likeProduct", error);
    throw error;
  }
};