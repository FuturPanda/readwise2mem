import { supabase } from "../supabaseConfig";
import { formatUniqueMem, appendMem } from "./memController";
import { MemClient } from "@mem-labs/mem-node";

const checkBookDB = async (dataHighlight, userId, memId, memApiKey) => {
  console.log("checking db...");
  const { user_book_id, highlights } = dataHighlight;
  const { data, error } = await supabase
    .from("books_readwise")
    .select()
    .eq("id", user_book_id);

  if (data == false) {
    console.log("Book unfound, creating book DB...");
    addBookToDB(user_book_id, highlights, userId, memId);
    const dataToSend = formatUniqueMem(dataHighlight, userId, memId);
    if (dataToSend) {
      const memClient = new MemClient({
        apiAccessToken: memApiKey,
      });

      const newMem = memClient.createMem({
        content: dataToSend,
        memId: memId,
      });
    }
  } else {
    console.log("book founded, checking hilight");
    const book = data[0];

    console.log(book);
    console.log(book.id);

    for (let i = 0; i < highlights.length; i++) {
      if (!book.highlights.highlights.includes(highlights[i].id)) {
        console.log("highlight missing");
        addHighlightToBook(highlights[i].id, book);
        const highlightToSend = { content: ` - \n ${highlights[i].text}` };
        appendMem(highlightToSend, book.mem_id, memApiKey);
      } else console.log("highlight present");
    }
    return false;
  }
};
const addHighlightToBook = async (highlight, book) => {
  try {
    const { error } = await supabase
      .from("books_readwise")
      .update({ highlights: [...book.highlights.highlights, highlight] })
      .eq("id", book.id);
    console.log("hightlight added to DB");
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
    console.log("book added to DB");
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};
export { addBookToDB, checkBookDB };
