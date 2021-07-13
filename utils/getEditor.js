module.exports = function getEditor(editor) {
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
};
