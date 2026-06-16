import {
  Language,
  generateNonceWords,
  LANGUAGE_GROUPS,
  DEFAULT_MIX_SETTINGS,
  DEFAULT_CHINESE_MIX,
  DEFAULT_ARABIC_MIX,
  DEFAULT_ENGLISH_MIX,
} from "@nowhere/core";

const langSelect = document.getElementById("lang") as HTMLSelectElement;
const allOpt = document.createElement("option");
allOpt.value = Language.All;
allOpt.textContent = Language.All;
langSelect.appendChild(allOpt);

for (const langs of Object.values(LANGUAGE_GROUPS)) {
  for (const l of langs) {
    const opt = document.createElement("option");
    opt.value = l;
    opt.textContent = l;
    langSelect.appendChild(opt);
  }
}

const countInput = document.getElementById("count") as HTMLInputElement;
const minLenInput = document.getElementById("minLen") as HTMLInputElement;
const maxLenInput = document.getElementById("maxLen") as HTMLInputElement;
const corruptionSlider = document.getElementById("corruption") as HTMLInputElement;
const corruptionVal = document.getElementById("corruptionVal") as HTMLSpanElement;
corruptionSlider.addEventListener("input", () => {
  corruptionVal.textContent = (parseInt(corruptionSlider.value) / 100).toFixed(2);
});
const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
const resultsEl = document.getElementById("results") as HTMLDivElement;

let lastWords: { word: string; ascii: string }[] = [];

document.getElementById("form")!.addEventListener("submit", async (e) => {
  e.preventDefault();
  generateBtn.disabled = true;
  generateBtn.textContent = "generating...";
  resultsEl.textContent = "";
  lastWords = [];
  try {
    lastWords = await generateNonceWords({
      language: langSelect.value as Language,
      count: parseInt(countInput.value) || 24,
      minLength: parseInt(minLenInput.value) || 4,
      maxLength: parseInt(maxLenInput.value) || 40,
      romanizationStyle: "mixed",
      arabicStyle: "mixed",
      englishStyle: "mixed",
      mixSettings: { ...DEFAULT_MIX_SETTINGS },
      chineseMixSettings: { ...DEFAULT_CHINESE_MIX },
      arabicMixSettings: { ...DEFAULT_ARABIC_MIX },
      englishMixSettings: { ...DEFAULT_ENGLISH_MIX },
      corruption: parseInt(corruptionSlider.value) / 100,
    });

    const copyAll = (key: "word" | "ascii") => {
      navigator.clipboard.writeText(lastWords.map(w => w[key]).join("\n"));
    };

    const nameCopy = document.createElement("a");
    nameCopy.href = "#";
    nameCopy.textContent = "[copy all]";
    nameCopy.onclick = (e) => { e.preventDefault(); copyAll("word"); };

    const asciiCopy = document.createElement("a");
    asciiCopy.href = "#";
    asciiCopy.textContent = "[copy all]";
    asciiCopy.onclick = (e) => { e.preventDefault(); copyAll("ascii"); };

    const table = document.createElement("table");
    const thead = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("name "));
    th1.appendChild(nameCopy);
    const th2 = document.createElement("th");
    th2.appendChild(document.createTextNode("ascii "));
    th2.appendChild(asciiCopy);
    const th3 = document.createElement("th");
    th3.textContent = "lang";
    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    table.appendChild(thead);

    for (const w of lastWords) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = w.word;
      const td2 = document.createElement("td");
      td2.textContent = w.ascii;
      const td3 = document.createElement("td");
      td3.textContent = w.language;
      td3.style.fontSize = "small";
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.addEventListener("click", () => navigator.clipboard.writeText(w.ascii));
      table.appendChild(tr);
    }
    resultsEl.appendChild(table);
  } catch {
    resultsEl.textContent = "error generating names";
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "generate";
  }
});