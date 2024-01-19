"use client";

import * as React from "react";
import MarkdownRenderer from "@/app/board/common/components/MarkdownRenderer";
import AceEditor from "@/app/board/common/components/AceEditor";

type Props = React.ComponentProps<"div"> & {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const EditorContainer = (props: Props): JSX.Element => {
  React.useEffect(() => {
    if (props.content !== "") {
      props.setContent(props.content);
    }
  }, []);

  React.useEffect(() => {
    props.setContent(props.content);
  }, [props.content]);

  return (
    <div className={`EditContainer flex flex-col ${props.className}`}>
      <AceEditor content={props.content} setContent={props.setContent} />
      <MarkdownRenderer content={props.content} />
    </div>
  );
};
export default EditorContainer;
