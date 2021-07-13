export default function getEditor(editor: string): string {
  switch (editor) {
    case "vscode(code)":
      return "code";
    case "vim(vim)":
      return "vim";
    case "neovim(nvim)":
      return "nvim";
    case "atom(atom)":
      return "atom";
    default:
      return editor;
  }
}
