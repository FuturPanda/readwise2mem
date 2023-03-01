import { supabase } from "../supabaseConfig";

const checkBookDB = async (book_id, highlights, userId, memId) => {
  const { data, error } = await supabase
    .from("books_readwise")
    .select()
    .eq("id", book_id);

  if (data == false) {
    // addBookToDB(book_id, highlights, userId, memId)
  } else {
    const book = data[0];
    for (let i = 0; i < highlights.length; i++) {
      if (book.highlights.highlights.includes(highlights[i].id)) return;
      else {
        addHighlightToBook();
      }
      console.log(highlights[i].id);
      // console.log(book.highlights.highlights[i]);
    }
  }
};
const addHighlightToBook = async (highlights, book_id) => {
  try {
    const allHighlightsID = { highlights: highlights.map((item) => item.id) };
    const { error } = await supabase
      .from("books_readwise")
      .update({ highlights: allHighlightsID })
      .eq("id", book_id);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

const addBookToDB = async (book_id, highlights, userId, memId) => {
  try {
    const allHighlightsID = { highlights: highlights.map((item) => item.id) };
    const { error } = await supabase.from("books_readwise").insert({
      id: book_id,
      highlights: allHighlightsID,
      user_id: userId,
      mem_id: memId,
    });
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};
export { addBookToDB, checkBookDB };
