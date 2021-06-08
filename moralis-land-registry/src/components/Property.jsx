import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useProperty } from "../hooks/property";

export default function Property({ ifpsPath }) {
  const [showTitleDoc, setShowTitleDoc] = useState(false);
  const { name, image } = useProperty(ifpsPath);

  if (!name) {
    return null;
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>{name}</Typography>
        <Button
          variant="contained"
          onClick={() => setShowTitleDoc(!showTitleDoc)}
        >
          {showTitleDoc ? "Hide Title" : "Show Title"}
        </Button>
        {showTitleDoc && (
          <Document file={image}>
            <Page pageNumber={1} />
          </Document>
        )}
      </CardContent>
    </Card>
  );
}
