/* ==========================================================
   icerikler.html - Canlı Arama / Filtreleme
   Kartlar YALNIZCA data-title özniteliğine göre filtrelenir.
   ========================================================== */
document.addEventListener("DOMContentLoaded", function () {
  // --- Elemanları seç ---
  var input = document.getElementById("aramaInput");
  var temizleBtn = document.getElementById("temizleBtn");
  var sayac = document.getElementById("sonucSayaci");
  var sonucYok = document.getElementById("sonucYok");
  var kartlar = document.querySelectorAll(".kart[data-title]");

  // Bu sayfada arama alanı yoksa hiçbir şey yapma
  if (!input || kartlar.length === 0) return;

  /* Türkçe karakterlere duyarlı, küçük harfe çevrilmiş metin döndürür */
  function normalize(metin) {
    return metin.toLocaleLowerCase("tr-TR").trim();
  }

  /* Kartları filtreler, sayacı ve mesajı günceller */
  function filtrele() {
    var sorgu = normalize(input.value);
    var gorunen = 0;

    kartlar.forEach(function (kart) {
      var baslik = normalize(kart.getAttribute("data-title"));
      var eslesti = baslik.indexOf(sorgu) !== -1; // boş sorgu = hepsi eşleşir
      kart.classList.toggle("gizli", !eslesti);
      if (eslesti) gorunen++;
    });

    // Dinamik sonuç sayacı
    sayac.textContent = gorunen + " / " + kartlar.length + " sonuç gösteriliyor";

    // Eşleşme yoksa mesajı göster
    sonucYok.classList.toggle("gizli", gorunen !== 0);
  }

  /* Aramayı sıfırlar */
  function temizle() {
    input.value = "";
    filtrele();
    input.focus();
  }

  // --- Olaylar ---
  input.addEventListener("input", filtrele); // yazdıkça canlı filtre
  temizleBtn.addEventListener("click", temizle);

  filtrele(); // Sayfa açılışında sayacı başlat
});
