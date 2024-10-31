// Just an idea for now..
document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('.anchor-heading');
    headings.forEach((heading) => {
        const anchor = document.createElement('a');
        anchor.href = `#${heading.id}`;
        anchor.textContent = '#';
        anchor.style.marginRight = '0.5rem';
        //anchor.style.fontSize = '0.8em';
        anchor.style.opacity = '0';
        heading.onmouseover = () => {
            anchor.style.opacity = '1';
        };
        heading.onmouseout = () => {
            anchor.style.opacity = '0';
        };
        heading.prepend(anchor);
    });
});
