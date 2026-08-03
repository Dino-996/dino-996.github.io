import test from "node:test";
import assert from "node:assert/strict";
import { decodeHtml, slugifyIt, emptyPost } from "../src/lib/utils.js";

test("decodeHtml decodifica le entità comuni", () => {
    assert.equal(decodeHtml("it&#39;s &amp; &quot;quoted&quot; &lt;x&gt;"), "it's & \"quoted\" <x>");
    assert.equal(decodeHtml(null), null);
    assert.equal(decodeHtml(undefined), undefined);
});

test("slugifyIt genera slug coerenti con i tag", () => {
    assert.equal(slugifyIt("Sistemi Operativi"), "sistemi-operativi");
    assert.equal(slugifyIt("  Reti & Sicurezza  "), "reti-e-sicurezza");
    assert.equal(slugifyIt(""), "");
    assert.equal(slugifyIt(undefined), "");
});

test("emptyPost restituisce un post vuoto non pubblicato", () => {
    const p = emptyPost();
    assert.equal(p.permalink, false);
    assert.equal(p.title, "");
    assert.equal(p.url, "");
    assert.ok(p.date instanceof Date);
});
