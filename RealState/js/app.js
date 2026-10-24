const propiedades = document.querySelectorAll('.propiedad__imagen');
window.addEventListener('scroll', () => {
    propiedades.forEach(propiedad => {
        propiedad.style.backgroundPositionY = `${(-1) * this.scrollY / 20}px`;
    });
});