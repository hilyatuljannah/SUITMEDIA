document.addEventListener('DOMContentLoaded', function () {
    const labels = document.querySelectorAll('.oval-label');

    labels.forEach(function(label) {
        const icon = label.querySelector('.label-icon');
        const select = label.nextElementSibling;

        // Ubah ikon saat label atau dropdown diklik
        select.addEventListener('change', function () {
            icon.innerHTML = select.value === "10" ? '&#128197;' : '&#128100;'; // Mengubah ikon berdasarkan nilai select
        });

        // Atau ubah ikon ketika label diklik
        label.addEventListener('click', function () {
            icon.innerHTML = icon.innerHTML === '&#128197;' ? '&#128100;' : '&#128197;'; // Mengubah ikon secara bergantian
        });
    });
});
