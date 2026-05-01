import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const sourceFile = "E:/project_Nextjs/bexon/Bexon/Template/index-4.html";
const outputRoot = path.join(projectRoot, "src/components/bexon");

const html = readFileSync(sourceFile, "utf8");

const ensureDir = (dir) => mkdirSync(dir, { recursive: true });

const brandLogoMarkup = `<a class="logo brand-logo" href="/" aria-label="Global Experts for Industrial Development and Green Consultations">
                <img src="/images/logo.jpeg" alt="">
                <span class="brand-name">
                  <span class="brand-name-ar" lang="ar">الشركة الدولية لخبراء التطوير الصناعي والإستشارات الخضراء</span>
                  <span class="brand-name-en" lang="en">Global Experts for Industrial Development and Green Consultations</span>
                </span>
              </a>`;

const mobileBrandLogoMarkup = `<a href="/" class="mobile_logo brand-logo" aria-label="Global Experts for Industrial Development and Green Consultations">
              <img src="/images/logo.jpeg" alt="">
              <span class="brand-name">
                <span class="brand-name-ar" lang="ar">الشركة الدولية لخبراء التطوير الصناعي والإستشارات الخضراء</span>
                <span class="brand-name-en" lang="en">Global Experts for Industrial Development and Green Consultations</span>
              </span>
            </a>`;

const normalizeMarkup = (value) =>
  value
    .replaceAll("\r\n", "\n")
    .replace(/(["'(=])(?:\.\/)?assets\//g, "$1/assets/")
    .replace(/\/assets\/images\/logos\/logo(?:-2)?\.webp/g, "/images/logo.jpeg")
    .replace(/\/assets\/images\/hero\/h4-hero-img\.webp/g, "/images/hero-industrial-solar-1479x648.jpg")
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/action="index\.html"/g, 'action="/"')
    .replace(/href="([a-z0-9-]+)\.html"/gi, 'href="/$1"')
    .replace(/<a class="logo" href="\/"><img src="\/images\/logo\.jpeg" alt=""><\/a>/g, brandLogoMarkup)
    .replace(/<a href="\/" class="mobile_logo">\s*<img src="\/images\/logo\.jpeg" alt="Logo">\s*<\/a>/g, mobileBrandLogoMarkup)
    .replace(
      /<div class="header-right-item d-none d-lg-inline-flex">/g,
      '<div class="header-right-item d-none d-lg-inline-flex">\n              <div class="bexon-language-slot" data-bexon-language-slot="desktop"></div>'
    )
    .replace(
      /<!-- menu bar -->\n\s*<div class="menu_bar mobile_menu_bar d-lg-none">/g,
      '<!-- menu bar -->\n            <div class="bexon-language-slot bexon-language-slot-mobile d-lg-none" data-bexon-language-slot="mobile"></div>\n            <div class="menu_bar mobile_menu_bar d-lg-none">'
    )
    .replace(
      /<\/div>\n\s*<div class="hamburger_close">/g,
      '</div>\n          <div class="bexon-language-slot bexon-language-slot-drawer" data-bexon-language-slot="drawer"></div>\n          <div class="hamburger_close">'
    )
    .trim();

const escapeTemplate = (value) => value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const extractBetween = (start, end, occurrence = 1) => {
  let from = 0;
  let startIndex = -1;
  for (let i = 0; i < occurrence; i += 1) {
    startIndex = html.indexOf(start, from);
    if (startIndex === -1) {
      throw new Error(`Could not find start marker: ${start}`);
    }
    from = startIndex + start.length;
  }

  const endIndex = html.indexOf(end, from);
  if (endIndex === -1) {
    throw new Error(`Could not find end marker: ${end}`);
  }

  return normalizeMarkup(html.slice(startIndex, endIndex + end.length));
};

const extractSection = (label) =>
  extractBetween(`<!-- start: ${label} -->`, `<!-- end: ${label} -->`);

const extractShell = () => {
  const bodyStart = html.indexOf("<body>");
  const offcanvasStart = html.indexOf("<!-- start: Offcanvas Menu -->");
  if (bodyStart === -1 || offcanvasStart === -1) {
    throw new Error("Could not locate template shell.");
  }

  return normalizeMarkup(html.slice(bodyStart + "<body>".length, offcanvasStart));
};

const stripMarkerComments = (value) =>
  value
    .replace(/^\s*<!--[^\n]*-->\s*/g, "")
    .replace(/\s*<!--[^\n]*-->\s*$/g, "")
    .trim();

const parseOuterElement = (componentName, markup) => {
  const withoutComments = stripMarkerComments(markup);
  const open = withoutComments.match(/^<([a-z][\w-]*)([^>]*)>/i);
  if (!open) {
    throw new Error(`Could not parse outer element for ${componentName}`);
  }

  const tag = open[1];
  const attrText = open[2] ?? "";
  const closeTag = new RegExp(`</${tag}>\\s*$`, "i");
  const inner = withoutComments.replace(/^<[^>]+>/, "").replace(closeTag, "").trim();
  const props = [];
  const attrRegex = /([:\w-]+)(?:="([^"]*)")?/g;
  let match;

  while ((match = attrRegex.exec(attrText)) !== null) {
    const attrName = match[1];
    const attrValue = match[2];
    const propName = attrName === "class" ? "className" : attrName === "for" ? "htmlFor" : attrName;

    if (attrValue === undefined) {
      props.push(propName);
    } else {
      props.push(`${propName}=${JSON.stringify(attrValue)}`);
    }
  }

  return { tag, props: props.join(" "), inner };
};

const writeRawComponent = (fileName, componentName, markup) => {
  const filePath = path.join(outputRoot, fileName);
  writeFileSync(
    filePath,
    `const html = \`${escapeTemplate(markup)}\`;

export function ${componentName}() {
  return <div className="bexon-static-html" dangerouslySetInnerHTML={{ __html: html }} />;
}
`
  );
};

const writeElementComponent = (folder, fileName, componentName, markup) => {
  const filePath = path.join(outputRoot, folder, fileName);
  const { tag, props, inner } = parseOuterElement(componentName, markup);
  const propsText = props ? ` ${props}` : "";

  writeFileSync(
    filePath,
    `const html = \`${escapeTemplate(inner)}\`;

export function ${componentName}() {
  return <${tag}${propsText} dangerouslySetInnerHTML={{ __html: html }} />;
}
`
  );
};

ensureDir(outputRoot);
ensureDir(path.join(outputRoot, "layout"));
ensureDir(path.join(outputRoot, "sections"));

writeRawComponent("BexonShellElements.jsx", "BexonShellElements", extractShell());

writeElementComponent("layout", "OffcanvasMenu.jsx", "OffcanvasMenu", extractSection("Offcanvas Menu"));
writeElementComponent("layout", "MobileHamburgerMenu.jsx", "MobileHamburgerMenu", extractSection("Hamburger Menu"));
writeElementComponent(
  "layout",
  "PrimaryHeader.jsx",
  "PrimaryHeader",
  extractBetween("<!-- start: Header Area -->", "<!-- end: Header Area -->", 1)
);
writeElementComponent(
  "layout",
  "StickyHeader.jsx",
  "StickyHeader",
  extractBetween("<!-- start: Header Area -->", "<!-- end: Header Area -->", 2)
);
writeElementComponent("layout", "Footer.jsx", "Footer", extractSection("Footer Section"));

const sections = [
  ["Banner Section", "BannerSection"],
  ["Choose Section", "ChooseSection"],
  ["About Section", "AboutSection"],
  ["Service Section", "ServiceSection"],
  ["Fun fact Section", "FunFactSection"],
  ["Project Section", "ProjectSection"],
  ["Pricing Section", "PricingSection"],
  ["Contact Section", "ContactSection"],
  ["Blog Section", "BlogSection"]
];

for (const [label, componentName] of sections) {
  writeElementComponent("sections", `${componentName}.jsx`, componentName, extractSection(label));
}
