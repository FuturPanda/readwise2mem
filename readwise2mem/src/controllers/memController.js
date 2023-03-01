import { MemClient } from "@mem-labs/mem-node";
const formatUniqueMem = (dataobj, userId, memId) => {
  console.log("formatting mem....");

  const {
    title,
    author,
    source,
    category,
    readwise_url,
    source_url,
    document_note,
    highlights,
    user_book_id,
  } = dataobj;

  const textDataToSend = [
    "# ",
    title + "\n",
    "#readwise" + "\n",
    "Author :",
    author + "\n",
    "Source : ",
    "#" + source + "\n",
    "Category : ",
    "#" + category + "\n",
    "URL :",
    "Readwise URL: ",
    readwise_url + "\n",
    "Source URL: ",
    source_url + "\n",
  ];
  if (document_note != null) {
    textDataToSend.push("## Document note : " + "\n" + document_note + "\n");
  }
  if (highlights.length != 0) {
    textDataToSend.push("## Highlights : " + "\n");
    for (let i = 0; i < highlights.length; i++) {
      const textHighlight = highlights[i].text;
      // Reader Source.
      if (source == "reader") {
        textDataToSend.push(
          "\n" + ". **" + (i + 1) + "**" + "\n" + textHighlight + "\n"
        );
        if (highlights[i].note != "") {
          textDataToSend.push("- Note : " + highlights[i].note + "\n");
        }
      } else if (source == "snipd") {
        textDataToSend.push("\n" + "### " + textHighlight + "\n");
      } else {
        textDataToSend.push(
          "\n" + ". **" + (i + 1) + "**" + "\n" + textHighlight + "\n"
        );
      }
    }
    return textDataToSend.join(" ");
  } else return false;
};

const appendMem = async (data, memId, memApiKey) => {
  const response = await fetch(`https://api.mem.ai/v0/mems/${memId}/append`, {
    method: "POST",
    headers: {
      Authorization: `ApiAccessToken ${memApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export { formatUniqueMem, appendMem };
