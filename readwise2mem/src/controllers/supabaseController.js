import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseConfig";
const checkBookDB = async () => {};

const addBookToDB = async (book_id, highlights, userId) => {
  try {
    const memId = uuidv4();
    const allHighlightsID = { highlights: highlights.map((item) => item.id) };
    const { error } = await supabase
      .from("books_readwise")
      .insert({
        id: book_id,
        highlights: allHighlightsID,
        user_id: userId,
        memId,
      });
    return memId;
  } catch (error) {
    console.log(error);
  }
};
export default addBookToDB;
