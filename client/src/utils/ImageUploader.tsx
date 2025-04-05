export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "djy7my1mw");

    const res = await fetch("https://api.cloudinary.com/v1_1/djy7my1mw/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return data.secure_url;
};