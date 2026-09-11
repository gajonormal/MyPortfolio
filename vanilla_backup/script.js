// Clock Functionality
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    const formattedHours = String(hours).padStart(2, '0');
    
    // Format: DD/MM/YYYY HH:MMam/pm PT
    const timeString = `${day}/${month}/${year} ${formattedHours}:${minutes}${ampm} PT`;
    clockElement.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

// SPA Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const body = document.body;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            
            if (targetId && document.getElementById(targetId)) {
                e.preventDefault();
                
                // Hide all sections
                sections.forEach(sec => sec.classList.remove('active'));
                
                // Show target section
                document.getElementById(targetId).classList.add('active');
                
                // Update body attribute for specific CSS styling (like hiding main header)
                body.setAttribute('data-current-section', targetId);
                
                // Theme Switching
                if (targetId === 'home') {
                    body.classList.remove('theme-light');
                    body.classList.add('theme-dark');
                } else {
                    body.classList.remove('theme-dark');
                    body.classList.add('theme-light');
                }
                
                // Scroll to top on navigation
                window.scrollTo(0, 0);
            }
        });
    });

    // Project Views Toggle Logic
    const viewToggles = document.querySelectorAll('.view-toggle');
    const projectViews = document.querySelectorAll('.projects-view');

    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = toggle.getAttribute('data-view');
            const currentView = document.querySelector('.projects-view.active-view');
            
            // Só executa a transição se estiver a clicar numa vista diferente da atual
            if (currentView && currentView.id !== targetView) {
                // Atualizar o texto a negrito
                viewToggles.forEach(t => t.classList.remove('active-toggle'));
                toggle.classList.add('active-toggle');
                
                // Iniciar Fade Out na vista atual
                currentView.classList.add('fading-out');
                
                // Esperar que o Fade Out termine (300ms) para trocar o display
                setTimeout(() => {
                    currentView.classList.remove('active-view');
                    currentView.classList.remove('fading-out');
                    
                    const nextView = document.getElementById(targetView);
                    if (nextView) {
                        nextView.classList.add('active-view');
                    }
                }, 300);
            }
        });
    });

    // Simple category active state toggler for the grid sidebar
    const categories = document.querySelectorAll('.category-nav a');
    categories.forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.preventDefault();
            categories.forEach(c => c.classList.remove('active-category'));
            cat.classList.add('active-category');
        });
    });

    // Project Modal Logic
    const projectTriggers = document.querySelectorAll('.project-trigger');
    const projectModal = document.getElementById('project-modal');

    projectTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            projectModal.classList.add('active');
        });
    });

    // Close modal when clicking outside the content (on the dark overlay)
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.add('fading-out');
            setTimeout(() => {
                projectModal.classList.remove('active');
                projectModal.classList.remove('fading-out');
            }, 300);
        }
    });
});
