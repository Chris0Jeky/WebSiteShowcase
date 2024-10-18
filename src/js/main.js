// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

//VUE

var app = new Vue({
    el: '#app',
    data: {
        // Portfolio projects
        projects: [
            {
                id: 1,
                title: 'Project Title 1',
                description: 'Short description of the project.',
                image: 'images/project1.jpg',
                details: 'Detailed description of the project, technologies used, and your role.',
                modalImage: 'images/project1-detail.jpg'
            },
            // Add more project objects here
        ],
        // Blog posts
        blogPosts: [
            {
                id: 1,
                title: 'Blog Post Title 1',
                excerpt: 'An excerpt from the blog post...',
                image: 'images/blog1.jpg',
                content: 'Full content of the blog post.',
                date: '2024-10-18'
            },
            // Add more blog post objects here
        ],
        // Search query for blog posts
        searchQuery: '',
        // Contact form data
        contactForm: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        formErrors: {},
        // FAQs
        faqs: [
            {
                question: 'Question 1',
                answer: 'Answer to question 1.',
                isOpen: false
            },
            // Add more FAQ objects here
        ],
        // Current project for modal
        currentProject: null
    },
    computed: {
        filteredBlogPosts() {
            if (this.searchQuery) {
                return this.blogPosts.filter(post =>
                    post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            } else {
                return this.blogPosts;
            }
        }
    },
    methods: {
        // Contact form validation
        validateForm() {
            this.formErrors = {};

            if (!this.contactForm.name) {
                this.formErrors.name = 'Name is required.';
            }
            if (!this.contactForm.email) {
                this.formErrors.email = 'Email is required.';
            } else if (!this.validEmail(this.contactForm.email)) {
                this.formErrors.email = 'Valid email required.';
            }
            if (!this.contactForm.subject) {
                this.formErrors.subject = 'Subject is required.';
            }
            if (!this.contactForm.message) {
                this.formErrors.message = 'Message is required.';
            }

            if (Object.keys(this.formErrors).length === 0) {
                // Form is valid, proceed with submission (placeholder)
                alert('Form submitted successfully!');
                // Reset form
                this.contactForm = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                };
            }
        },
        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
            return re.test(email);
        },
        // Toggle FAQ visibility
        toggleFAQ(faq) {
            faq.isOpen = !faq.isOpen;
        },
        // Open project modal
        openProjectModal(project) {
            this.currentProject = project;
            $('#projectModal').modal('show');
        },
        // Close project modal
        closeProjectModal() {
            this.currentProject = null;
            $('#projectModal').modal('hide');
        }
    }
});
