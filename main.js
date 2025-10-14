class MinimalSite {
  constructor() {
    this.projects = {
      'ai-impact': {
        title: 'AI Impact Analysis on Digital Media',
        image: 'images/ai-imact.png',
        skills: ['SQL', 'Tableau'],
        description: 'A comprehensive SQL-based analysis of AI adoption, job loss, and content volume trends across industries and countries (2020-2025). This project examines the profound impact of artificial intelligence on the digital media landscape and workforce dynamics, providing insights into how AI is reshaping content creation, distribution, and employment patterns.',
        githubUrl: 'https://github.com/Viktor-Kukhar/ai-impact-analysis',
        tableauUrl: 'https://public.tableau.com/app/profile/viktor.kukhar/viz/AIImpactAnalysis/Dashboard'
      },
      'cybersecurity': {
        title: 'Cybersecurity Threats Analysis',
        image: 'images/cybersecurity.png',
        skills: ['SQL', 'Tableau'],
        description: 'An in-depth SQL-based analysis of a global cybersecurity dataset spanning 2015–2024. This project uncovers critical insights into attack trends, financial losses, and threat actor behaviors, providing actionable recommendations for security professionals and organizations looking to strengthen their cybersecurity posture.',
        githubUrl: 'https://github.com/Viktor-Kukhar/cybersecurity-threats-analysis',
        tableauUrl: 'https://public.tableau.com/app/profile/viktor.kukhar/viz/Cybersecurity_17538803089120/Dashboard'
      },
      'hospital-management': {
        title: 'Hospital Management Analysis',
        image: 'images/hospital-management.png',
        skills: ['SQL', 'Tableau'],
        description: 'A detailed SQL-based analysis of a hospital management dataset from 2023. This project reveals insights into doctor performance, patient billing patterns, and operational efficiency metrics, offering actionable recommendations for hospital administrators to optimize healthcare delivery and resource allocation.',
        githubUrl: 'https://github.com/Viktor-Kukhar/hospital-management-analysis',
        tableauUrl: 'https://public.tableau.com/app/profile/viktor.kukhar/viz/HospitalManagement_17528395711840/Dashboard'
      },
      'online-retail': {
        title: 'Online Retail Analysis',
        image: 'images/online-retail.png',
        skills: ['SQL', 'Tableau'],
        description: 'A comprehensive SQL-based analysis of an online retail dataset from 2010-2011. This project explores customer purchasing behavior, sales trends, and product performance patterns, delivering data-driven recommendations for retail optimization and strategic decision-making.',
        githubUrl: 'https://github.com/Viktor-Kukhar/online-retail-analysis',
        tableauUrl: 'https://public.tableau.com/app/profile/viktor.kukhar/viz/Retail_17531934111190/Dashboard'
      }
    };
    this.initialize();
  }

  initialize() {
    this.setYear();
    this.setupProjectCards();
    this.setupModal();
  }

  setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
  }

  setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.getAttribute('data-project');
        this.openModal(projectId);
      });
    });
  }

  setupModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  openModal(projectId) {
    const project = this.projects[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImageSrc = document.getElementById('modalImageSrc');
    const modalSkills = document.getElementById('modalSkills');
    const modalDescription = document.getElementById('modalDescription');
    const modalLinks = document.getElementById('modalLinks');

    // Set modal content
    modalTitle.textContent = project.title;
    modalImageSrc.src = project.image;
    modalImageSrc.alt = `${project.title} dashboard screenshot`;
    modalDescription.textContent = project.description;

    // Set project links as pill buttons
    modalLinks.innerHTML = '';
    
    // GitHub link
    const githubLink = document.createElement('a');
    githubLink.href = project.githubUrl;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-normal text-black transition hover:border-accent hover:text-accent hover:bg-accent/5 hover:shadow-sm';
    githubLink.innerHTML = '<i class="fab fa-github text-xl"></i>GitHub<i class="fas fa-arrow-right text-xs"></i>';
    modalLinks.appendChild(githubLink);

    // Tableau link
    const tableauLink = document.createElement('a');
    tableauLink.href = project.tableauUrl;
    tableauLink.target = '_blank';
    tableauLink.rel = 'noopener noreferrer';
    tableauLink.className = 'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-normal text-black transition hover:border-accent hover:text-accent hover:bg-accent/5 hover:shadow-sm';
    tableauLink.innerHTML = '<svg style="width: 1.5em; height: 1.5em;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.654.174V2.377H9.682v.58h1.972V5.16h.696V2.957h1.97v-.58h-1.97V.174h-.348zm6.03 2.262l-.002 1.623v1.623h-2.957v.927h2.957v3.188H18.725l.011-1.582.02-1.576 1.465-.02 1.46-.01v-.927H18.728V2.436h-.522zm-12.407.06V5.686H2.291v.925H5.277V9.801h.985V6.61h3.013v-.925H6.262V2.496H5.77zm6.086 5.27v3.593H8.06v1.188h3.304v3.596h1.28v-3.596H15.953v-1.188H12.643V7.766h-.637zm9.721 1.55v2.221h-2.012v.811h2.012v2.261h.887v-2.261H24v-.811h-2.029V9.317h-.422zm-19.111.131V11.621H0v.621H1.973v2.194H2.64v-2.194h2v-.62H2.609V9.446h-.318zm15.709 4.516v3.254h-3.016v.927h3.016v3.217h1.072v-3.216H21.74v-.928H18.754v-3.254h-.533zm-12.463.008v3.246H2.262v.928h2.957v3.189H6.32v-3.189h2.955v-.928H6.32V13.97h-.55zm6.316 4.578l.002 1.103v1.1H9.566v.812h1.971v2.262h.928l.012-1.119.017-1.143H14.463v-.812h-2V18.549h-.465z"/></svg>Tableau<i class="fas fa-arrow-right text-xs"></i>';
    modalLinks.appendChild(tableauLink);

    // Set skills tags
    modalSkills.innerHTML = '';
    project.skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-normal';
      skillTag.textContent = skill;
      modalSkills.appendChild(skillTag);
    });

    // Show modal with animation
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger animation after a brief delay to ensure the element is visible
    setTimeout(() => {
      modal.classList.add('animate-fade-in');
      const modalContent = modal.querySelector('.bg-white');
      modalContent.classList.add('animate-scale-in');
    }, 10);
  }

  closeModal() {
    const modal = document.getElementById('projectModal');
    
    // Remove animation classes first
    modal.classList.remove('animate-fade-in');
    const modalContent = modal.querySelector('.bg-white');
    modalContent.classList.remove('animate-scale-in');
    
    // Hide modal after animation completes
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    }, 300);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MinimalSite();
});