import { get, ref } from "firebase/database";
import { db } from "./firebase";
export default async function getMethod2(path) {
  if (!path) return 'error. path harus di isi'
  try {
    const snapshot = await get(ref(db, path));

    if (!snapshot.exists()) {
      console.warn("No data found.");
      return [];
    }

    return snapshot.val();
    // return Object.values(snapshot.val());
  } catch (err) {
    console.error("Error fetching data:", err.message);
    throw err;
  }
}
