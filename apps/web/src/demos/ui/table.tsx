import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@solidx/kit/ui";

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Grace</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
