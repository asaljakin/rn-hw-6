import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { UserData } from "../types/userDataTypes";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { PostData } from "../types/postsDataTypes";
import { CommentData } from "../types/commentsDataTypes";

export const addUser = async (userId: string, userData: UserData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getUser = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const updateUserInFirestore = async (user: any) => {
  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        displayName: user.displayName || "Anonymous",
        lastLogin: new Date().toISOString(),
      },
      { merge: true }
    );
    console.log("User data saved to Firestore:", user.uid);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

export const uploadImage = async (
  userId: string,
  file: Blob,
  fileName: string
) => {
  try {
    const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);

    console.log("Uploading to:", imageRef.fullPath);
    const result = await uploadBytes(imageRef, file);
    console.log("Upload result:", result);
    return imageRef;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getImageUrl = async (imageRef: any) => {
  const url = await getDownloadURL(imageRef);
  return url;
};

export const addPost = async (
  userId: string | null,
  location: string,
  description: string,
  imageFile: Blob,
  fileName: string
) => {
  try {
    // Upload the image
    const imageRef = ref(storage, `posts/${userId}/${fileName}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    const postRef = doc(db, "posts", `${userId}_${Date.now()}`);
    const postData: PostData = {
      postId: postRef.id,
      userId,
      location,
      description,
      imageUrl,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    await setDoc(postRef, postData);
    console.log("Post added:", postRef.id);
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const getPostsByUser = async (userId: string | null) => {
  if (!userId) return [];

  try {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as PostData[];

    return posts;
  } catch (error) {
    console.error("Error retrieving posts for user:", error);
    return [];
  }
};

export const removeUserProfilePhotos = async (userId: string | null) => {
  if (userId) null;
  try {
    const userPhotosRef = ref(storage, `profilePhotos/${userId}`);

    const listResponse = await listAll(userPhotosRef);

    const deletePromises = listResponse.items.map((itemRef) => {
      return deleteObject(itemRef);
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error removing user profile photos:", error);
    throw error;
  }
};

export const getPostById = async (postId: string): Promise<PostData | null> => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {

      return { id: postSnap.id, ...postSnap.data() } as unknown as PostData; 
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

export const addComment = async (
  postId: string,
  userId: string,
  comment: string
) => {
  try {
    const commentData: CommentData = {
      userId,
      comment,
      createdAt: new Date().toISOString(),
    };
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion(commentData),
    });
    console.log("Comment added to post:", postId);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
