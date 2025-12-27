const CACHE_NAME = 'panduan-online-secure-v1';

// 1. SAAT INSTALL: Paksa update segera
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

// 2. SAAT AKTIF: Hapus SEMUA cache lama (Pembersihan Total)
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                return caches.delete(key); // Hapus memori HP
            }));
        }).then(() => self.clients.claim())
    );
});

// 3. SAAT FETCH DATA: NETWORK ONLY (Wajib Internet)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request, {
            cache: 'no-store', // Perintah keras: JANGAN SIMPAN DI MEMORI
            mode: 'cors'
        }).catch(() => {
            // Tampilan HTML Darurat jika Offline
            return new Response(`
                <html>
                <body style="background:#000; color:#d4af37; font-family:sans-serif; display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; text-align:center;">
                    <h2 style="margin-bottom:10px;">KONEKSI TERPUTUS</h2>
                    <p style="color:#fff; font-size:14px;">Aplikasi ini memerlukan koneksi internet stabil.</p>
                    <button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; border-radius:50px; border:none; background:#d4af37; font-weight:bold;">COBA LAGI</button>
                </body>
                </html>
            `, {
                headers: { "Content-Type": "text/html" }
            });
        })
    );
});
