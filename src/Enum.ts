export enum Leaves {
    FE = "file-explorer",
    G = "graph",
    LG = "localgraph",
    MD = "markdown",
    BL = "backlink",
    S = "search",
    ST = "starred",
    CV = "canvas",
}

export enum Feature {
    Explorer = "explorer",
    ExplorerSort = "explorer:sort",
    Graph = "graph",
    Header = "header",
    Starred = "starred",
    Search = "search",
    Tab = "tab",
    Alias = "alias",
    Suggest = "suggest",
    InlineTitle = "inlineTitle",
    Canvas = "canvas",
    Backlink = Leaves.BL,
    NoteLink = "noteLink",
}

export const Managers = [
    Feature.Explorer,
    Feature.Graph,
    Feature.Header,
    Feature.Starred,
    Feature.Search,
    Feature.Tab,
    Feature.InlineTitle,
    Feature.Canvas,
];

export const GITHUB_DOCS = "https://github.com/snezhig/obsidian-front-matter-title/blob/master/docs/";
