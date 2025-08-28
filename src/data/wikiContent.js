const wikiContent = {
    Docker: {
        title: 'Docker',
        pages: [
            {
                slug: 'docker/local',
                title: 'Running Locally',
                content: [
                    // { type: 'heading', text: 'Welcome to Kanwar Docs' },
                    // { type: 'paragraph', text: 'This is a simple, powerful documentation template.' },
                    // { type: 'code', language: 'bash', code: 'npm install your-package' },
                    // { type: 'callout', variant: 'info', text: 'This project is open-source and customizable.' },
                    // {
                    //     type: 'link',
                    //     href: 'https://vercel.com/templates',
                    //     text: 'Visit Vercel Templates'
                    // },
                    // { type: 'heading', text: 'Welcome to Kanwar Docs 2' },
                ]
            },
            {
                slug: 'docker/ecr',
                title: 'Setting up ECR',
                content: []
            },
            {
                slug: 'docker/ecs',
                title: 'Setting up ECS',
                content: []
            },
            {
                slug: 'docker/build-deploy',
                title: 'Build and Deploy',
                content: []
            },
        ]
    },
    MongoDB: {
        title: 'MongoDB',
        pages: [
            {
                slug: 'mongodb/getting-started',
                title: 'Getting Started with Mongo',
                content: []
            },
            {
                slug: 'mongodb/installation',
                title: 'Installation',
                content: []
            }
        ]
    }
};

export default wikiContent;