import { Box, Button } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';

export function MyDropzone() {
  const [file, setFile] = useState<File[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box sx={{ width: 300 }}>
      <Button onClick={() => setOpen(true)} />
      <DropzoneArea
        onChange={(files) => setFile(files)}
        // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        filesLimit={1}
        maxFileSize={5000000}
      />
    </Box>
  );
}
