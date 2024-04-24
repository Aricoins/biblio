import { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import { readFile } from 'fs';
import marked from 'marked'; // Library for markdown to HTML conversion

const readFileAsync = promisify(readFile);

export default async function convertDoc(req: NextApiRequest, res: NextApiResponse) {
  // Extract file path from request query parameters
  const { filePath } = req.query;

  if (!filePath) {
    return res.status(400).json({ message: 'Missing file path in query parameter' });
  }

  try {
    // Ensure filePath is a string
    if (typeof filePath === 'string') {
      // Read the document content
      const docContent = await readFileAsync(filePath, 'utf-8');
  
      // Check if the file extension is `.md` (markdown)
      if (filePath.endsWith('.md')) {
        // Convert markdown content to HTML using marked
        const htmlContent = marked(docContent);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(htmlContent);
      } else {
        // Handle other document formats (optional)
        // You can implement conversion logic for other formats (e.g., docx to html)
      }
    } else {
      return res.status(400).json({ message: 'Invalid file path' });
    }
  } catch (error) {
   
    console.error('Error reading or converting document:', error);
    return res.status(500).json({ message: 'Error converting document' });
  }
}
