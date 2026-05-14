const fs = require("fs");
const path = require("path");

const root = __dirname;
const outDir = path.join(root, "pptx-build");

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
const write = (file, body) => {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, body, "utf8");
};

const clean = (target) => {
  const resolved = path.resolve(target);
  if (!resolved.startsWith(path.resolve(root))) {
    throw new Error("Refusing to clean outside project root");
  }
  fs.rmSync(resolved, { recursive: true, force: true });
};

const cx = (inch) => Math.round(inch * 914400);
const pt = (size) => Math.round(size * 100);

const slides = [
  {
    eyebrow: "PROJECT PLAN",
    title: "악궁확장기 치료 기록 관리 앱",
    subtitle:
      "환자가 매일 확장 횟수, 회전수, 통증, 메모를 기록하고 병원이 진행 상황과 이상 증상을 확인하는 모바일 앱 및 관리자 시스템",
    accent: "0E9F90",
    blocks: [
      { title: "핵심 목표", body: "치료 기록 누락을 줄이고 모델별 확장량 계산을 자동화합니다." },
      { title: "주요 사용자", body: "환자와 병원 관리자가 각각 앱과 웹에서 필요한 정보를 확인합니다." },
    ],
  },
  {
    eyebrow: "SERVICE SCOPE",
    title: "서비스는 세 축으로 구성합니다",
    subtitle: "환자용 모바일 앱, 병원 관리자 웹, 백엔드 서버와 클라우드 인프라를 하나의 시스템으로 구축합니다.",
    accent: "213956",
    blocks: [
      { title: "환자용 모바일 앱", body: "고유 코드 로그인, 장치 모델 선택, 일일 기록, 이상 증상 보고" },
      { title: "병원 관리자 웹", body: "환자 목록, 모델 정보, 누적 확장량, 증상 보고 확인" },
      { title: "백엔드 서버", body: "인증, 기록 저장, 사진 업로드, 관리자 데이터 제공, 알림 연동" },
    ],
  },
  {
    eyebrow: "PATIENT FLOW",
    title: "환자 사용 흐름",
    subtitle: "최초 로그인부터 모델 선택, 매일 기록, 이상 보고까지 단순한 단계로 설계합니다.",
    accent: "EF6D5F",
    steps: ["고유 코드 로그인", "장치 모델 선택", "일일 확장 기록", "이상 증상 보고", "병원 확인"],
  },
  {
    eyebrow: "CORE FEATURES",
    title: "핵심 기능",
    subtitle: "치료 기록의 정확도와 병원 확인 속도를 높이는 기능에 집중합니다.",
    accent: "0E9F90",
    bullets: [
      "아이디와 비밀번호 없이 병원 발급 고유 코드로 로그인",
      "MSE1, MSE2, NEW MSE2, MSE3, KBE, KBE2 모델 선택",
      "모델별 1회 확장량과 총 확장 가능량 자동 표시",
      "날짜, 확장 횟수, 회전수, 통증 단계, 메모 입력",
      "당일 확장량과 누적 확장량 자동 계산",
      "사진 첨부와 메시지로 이상 증상 보고",
    ],
  },
  {
    eyebrow: "ADMIN FEATURES",
    title: "병원 관리자 기능",
    subtitle: "관리자는 환자별 치료 진행 상황과 신규 이상 보고를 빠르게 확인합니다.",
    accent: "213956",
    bullets: [
      "등록된 전체 환자 목록 및 환자별 고유 코드 조회",
      "환자별 악궁확장기 모델 정보 확인",
      "누적 확장량과 최근 기록 상태 확인",
      "환자가 전송한 이상 증상 사진 및 메시지 확인",
      "보고 확인 상태 관리 및 병원 알림 연동",
    ],
  },
  {
    eyebrow: "DATA DESIGN",
    title: "데이터 구조",
    subtitle: "환자, 장치 모델, 확장 기록, 이상 보고를 기준으로 단순하게 나눕니다.",
    accent: "EF6D5F",
    blocks: [
      { title: "환자 정보", body: "환자 ID, 고유 코드, 선택 장치 모델, 최초 로그인 여부" },
      { title: "장치 모델", body: "모델명, 1회 확장량, 총 확장 가능량, 안내 문구" },
      { title: "확장 기록", body: "날짜, 확장 횟수, 회전수, 당일/누적 확장량, 통증, 메모" },
      { title: "이상 보고", body: "보고 일시, 증상 메시지, 첨부 사진, 확인 상태" },
    ],
  },
  {
    eyebrow: "TECH STACK",
    title: "권장 기술 스택",
    subtitle: "턴키 개발 기준으로 앱, 서버, DB, 파일 저장, 배포까지 한 업체가 책임지는 구조를 권장합니다.",
    accent: "0E9F90",
    blocks: [
      { title: "모바일 앱", body: "React Native 또는 Flutter" },
      { title: "백엔드", body: "Node.js / NestJS API 서버" },
      { title: "데이터베이스", body: "PostgreSQL" },
      { title: "파일 저장", body: "AWS S3 또는 호환 스토리지" },
      { title: "관리자 웹", body: "React 기반 웹 페이지" },
      { title: "배포", body: "AWS, GCP, Naver Cloud 중 선택" },
    ],
  },
  {
    eyebrow: "DELIVERABLES",
    title: "주요 산출물",
    subtitle: "실제 운영 가능한 시스템과 운영 문서를 함께 납품합니다.",
    accent: "213956",
    bullets: [
      "화면 설계서 및 기능 정의서",
      "환자용 모바일 앱 UI/UX 디자인",
      "iOS / Android 환자용 앱",
      "병원용 관리자 웹페이지",
      "백엔드 API 서버와 데이터베이스",
      "파일 스토리지 및 클라우드 배포 환경",
      "관리자 사용 가이드",
    ],
  },
  {
    eyebrow: "FINAL GOAL",
    title: "최종 목표",
    subtitle:
      "환자는 자신의 치료 과정을 정확히 기록하고, 병원은 환자의 진행 상황과 이상 증상을 빠르게 확인할 수 있는 실사용 가능한 치료 기록 관리 시스템을 구축합니다.",
    accent: "EF6D5F",
    blocks: [
      { title: "환자 가치", body: "매일 기록해야 할 내용을 직관적으로 입력하고 누적 확장량을 확인합니다." },
      { title: "병원 가치", body: "환자별 치료 진행과 이상 증상 보고를 한 화면에서 확인합니다." },
    ],
  },
];

function textRun(text, size, color = "162235", bold = false) {
  return `<a:r><a:rPr lang="ko-KR" sz="${pt(size)}" ${bold ? 'b="1"' : ""}><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="Arial"/><a:ea typeface="Malgun Gothic"/></a:rPr><a:t>${esc(text)}</a:t></a:r>`;
}

function textBox(id, x, y, w, h, paragraphs, fill = null, line = null) {
  const fillXml = fill ? `<p:spPr><a:solidFill><a:srgbClr val="${fill}"/></a:solidFill>${line ? `<a:ln><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln>` : "<a:ln><a:noFill/></a:ln>"}</p:spPr>` : `<p:spPr><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr>`;
  return `<p:sp>
    <p:nvSpPr><p:cNvPr id="${id}" name="Text ${id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
    ${fillXml}
    <p:txBody>
      <a:bodyPr wrap="square" lIns="152400" tIns="91440" rIns="152400" bIns="91440"/>
      <a:lstStyle/>
      ${paragraphs
        .map(
          (runs) =>
            `<a:p>${runs.join("")}<a:endParaRPr lang="ko-KR"/></a:p>`,
        )
        .join("")}
    </p:txBody>
  </p:sp>`.replace("<p:spPr>", `<p:spPr><a:xfrm><a:off x="${cx(x)}" y="${cx(y)}"/><a:ext cx="${cx(w)}" cy="${cx(h)}"/></a:xfrm>`);
}

function rect(id, x, y, w, h, fill, alpha = null) {
  const alphaXml = alpha ? `<a:alpha val="${alpha}"/>` : "";
  return `<p:sp>
    <p:nvSpPr><p:cNvPr id="${id}" name="Shape ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
    <p:spPr>
      <a:xfrm><a:off x="${cx(x)}" y="${cx(y)}"/><a:ext cx="${cx(w)}" cy="${cx(h)}"/></a:xfrm>
      <a:prstGeom prst="roundRect"><a:avLst/></a:prstGeom>
      <a:solidFill><a:srgbClr val="${fill}">${alphaXml}</a:srgbClr></a:solidFill>
      <a:ln><a:noFill/></a:ln>
    </p:spPr>
    <p:txBody><a:bodyPr/><a:lstStyle/><a:p/></p:txBody>
  </p:sp>`;
}

function makeSlide(slide, index) {
  let id = 2;
  const shapes = [];
  shapes.push(rect(id++, 0, 0, 13.333, 0.22, slide.accent));
  shapes.push(textBox(id++, 0.62, 0.48, 2.3, 0.3, [[textRun(slide.eyebrow, 9.5, slide.accent, true)]]));
  shapes.push(textBox(id++, 0.62, 0.9, 7.9, 1.15, [[textRun(slide.title, index === 0 ? 34 : 27, "162235", true)]]));
  shapes.push(textBox(id++, 0.65, index === 0 ? 2.2 : 2.0, 7.6, 0.95, [[textRun(slide.subtitle, 14, "66758A", false)]]));
  shapes.push(rect(id++, 10.65, 0.42, 2.05, 0.46, "EAF6F4"));
  shapes.push(textBox(id++, 10.83, 0.5, 1.72, 0.25, [[textRun(`Slide ${index + 1}`, 9, "087568", true)]]));

  if (slide.blocks) {
    const count = slide.blocks.length;
    const cols = count > 4 ? 3 : count > 2 ? 2 : 1;
    const cardW = cols === 3 ? 3.85 : cols === 2 ? 5.75 : 5.9;
    const startX = count <= 2 ? 6.85 : 0.65;
    const startY = count <= 2 ? 3.55 : 3.25;
    slide.blocks.forEach((block, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + 0.28);
      const y = startY + row * 1.54;
      shapes.push(rect(id++, x, y, cardW, 1.23, "FFFFFF"));
      shapes.push(textBox(id++, x + 0.18, y + 0.14, cardW - 0.36, 0.28, [[textRun(block.title, 13.5, "162235", true)]]));
      shapes.push(textBox(id++, x + 0.18, y + 0.48, cardW - 0.36, 0.58, [[textRun(block.body, 10.5, "66758A")]]));
    });
  }

  if (slide.steps) {
    slide.steps.forEach((step, i) => {
      const x = 0.65 + i * 2.48;
      shapes.push(rect(id++, x, 3.55, 2.12, 1.92, i % 2 ? "EAF6F4" : "FFFFFF"));
      shapes.push(textBox(id++, x + 0.18, 3.72, 0.36, 0.34, [[textRun(String(i + 1), 14, slide.accent, true)]]));
      shapes.push(textBox(id++, x + 0.18, 4.25, 1.72, 0.78, [[textRun(step, 15, "162235", true)]]));
    });
  }

  if (slide.bullets) {
    slide.bullets.forEach((bullet, i) => {
      const x = i < 4 ? 0.85 : 6.78;
      const y = 3.05 + (i % 4) * 0.82;
      shapes.push(rect(id++, x, y + 0.08, 0.17, 0.17, slide.accent));
      shapes.push(textBox(id++, x + 0.35, y, 5.45, 0.45, [[textRun(bullet, 12, "334155")]]));
    });
  }

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="F4F8FB"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      ${shapes.join("\n")}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
}

function themeXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Palate Track">
  <a:themeElements>
    <a:clrScheme name="Palate Track">
      <a:dk1><a:srgbClr val="162235"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="213956"/></a:dk2><a:lt2><a:srgbClr val="F4F8FB"/></a:lt2>
      <a:accent1><a:srgbClr val="0E9F90"/></a:accent1><a:accent2><a:srgbClr val="EF6D5F"/></a:accent2>
      <a:accent3><a:srgbClr val="F0B94A"/></a:accent3><a:accent4><a:srgbClr val="66758A"/></a:accent4>
      <a:accent5><a:srgbClr val="213956"/></a:accent5><a:accent6><a:srgbClr val="EAF6F4"/></a:accent6>
      <a:hlink><a:srgbClr val="0E9F90"/></a:hlink><a:folHlink><a:srgbClr val="EF6D5F"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Palate Track"><a:majorFont><a:latin typeface="Arial"/><a:ea typeface="Malgun Gothic"/></a:majorFont><a:minorFont><a:latin typeface="Arial"/><a:ea typeface="Malgun Gothic"/></a:minorFont></a:fontScheme>
    <a:fmtScheme name="Palate Track"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>
  </a:themeElements>
  <a:objectDefaults/><a:extraClrSchemeLst/>
</a:theme>`;
}

clean(outDir);
ensureDir(outDir);

write(path.join(outDir, "[Content_Types].xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${slides.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join("\n  ")}
</Types>`);

write(path.join(outDir, "_rels/.rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`);

write(path.join(outDir, "docProps/app.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application><PresentationFormat>Widescreen</PresentationFormat><Slides>${slides.length}</Slides><Company>programmer119</Company>
</Properties>`);

write(path.join(outDir, "docProps/core.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>악궁확장기 치료 기록 관리 앱 기획 설계서</dc:title>
  <dc:creator>programmer119</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-05-14T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">2026-05-14T00:00:00Z</dcterms:modified>
</cp:coreProperties>`);

write(path.join(outDir, "ppt/presentation.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldSz cx="12192000" cy="6858000" type="wide"/>
  <p:notesSz cx="6858000" cy="9144000"/>
  <p:sldIdLst>${slides.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 1}"/>`).join("")}</p:sldIdLst>
  <p:defaultTextStyle><a:defPPr><a:defRPr lang="ko-KR"/></a:defPPr></p:defaultTextStyle>
</p:presentation>`);

write(path.join(outDir, "ppt/_rels/presentation.xml.rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${slides.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`).join("\n  ")}
  <Relationship Id="rId${slides.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
</Relationships>`);

write(path.join(outDir, "ppt/theme/theme1.xml"), themeXml());
slides.forEach((slide, index) => {
  write(path.join(outDir, `ppt/slides/slide${index + 1}.xml`), makeSlide(slide, index));
});

console.log(`PPTX source written to ${outDir}`);
