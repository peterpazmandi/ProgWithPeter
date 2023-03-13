import { useHeadsObserver } from "./hooks";
import { useEffect, useState, useRef } from "react";
import { Box, Link, Typography } from "@mui/material";

const getClassName = (level) => {
  switch (level) {
    case 1:
      return "head1";
    case 2:
      return "head2";
    case 3:
      return "head3";
    case 4:
      return "head4";
    default:
      return null;
  }
};

function TableOfContent() {
  const initialized = useRef(false);
  const [headings, setHeadings] = useState([]);
  const { activeId } = useHeadsObserver();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const elements = Array.from(document.querySelectorAll("h1")).map(
        (elem) => ({
          id: elem.id,
          text: elem.innerText,
          level: Number(elem.nodeName.charAt(1)),
        })
      );
      setHeadings(elements);
    }
  }, []);

  return (
    <Box
      sx={{
        minWidth: "220px",
        alignSelf: "flex-start",
        position: "-webkit-sticky",
        position: "sticky",
        maxHeight: "calc(100vh - 70px)",
        overflow: "auto",
        top: "80px",
      }}
    >
      {headings.map((heading) => (
        <Box mb={1} ml={heading.level * 2}>
          <Link
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: "smooth"
              })
            }}
            underline="hover">
            <Typography
              fontSize={12}
              fontWeight={activeId === heading.id ? "bold" : "normal"} >
              {heading.text}
            </Typography>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default TableOfContent;
