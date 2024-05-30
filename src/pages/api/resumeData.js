export default function handler(req, res) {
    const data = [
        {
            objectives: "Hello, my name is Atinderpaul Kanwar, and I am 25 years old. My goal is to align with companies and ideas where my work leads to significant contributions to the company's success and provides personal satisfaction. I am committed to continuous learning and applying my skills to the best of my abilities.",
            work: [
                {
                    key: 'Job4',
                    title: 'QA Analyst',
                    company: 'Bank of Montreal',
                    duration: 'June 2022 - Present',
                    details: [
                        'Performed functional automation testing on component level APIs that were modified within the bank using Selenium, Cucumber, Maven, SOAP and Postman.',
                        'Created and executed complex test scenarios for REST and SOAP APIs requiring field level encryption and pseudonymization.',
                        'Greatly improved the testing framework to handle negative test scenarios, different SSL certificates and overall readability of of the executed test reports.',
                        'Worked and led my team to work with multiple stakeholders within a project, including developers, project managers, inspectors.'
                    ]
                },
                {
                    key: 'Job3',
                    title: 'CTO',
                    company: 'FinSimpl',
                    duration: 'Nov 2020 - Aug 2021',
                    details: [
                        'Created a frontend website that allowed contractors to sign up and market themselves to their clients, as well as provide financing opportunities.',
                        'Integrated AWS services (DynamoDB, AWS Cognito) to allow the users to create accounts and save their personal site information.'
                    ]
                },
                {
                    key: 'Job2',
                    title: 'Mobile Applications Developer',
                    company: 'Electronics4All',
                    duration: '2021',
                    details: [
                        'Developed an mobile application using the Ionic Framework that allows users to scan, connect and monitor Bluetooth Low Energy (BLE) devices.',
                        'Worked closely with the electrical engineering team that created custom electronic devices that could be synced to a mobile device.',
                        'Created a versatile application that could be used on the web or your smartphone.'
                    ]
                },
                {
                    key: 'Job1',
                    title: 'Junior Applications Developer (COOP)',
                    company: 'Babcock Canada',
                    duration: 'May 2019 - Aug 2019',
                    details: [
                        'Migrated existing MS Access databases into new SQL databases.',
                        'Created a robust frontend that connected to the the SQL database and allowed for our company to more easily search, create or modify data.',
                    ]
                }
            ],
            education: [
                {
                    key: 'E1',
                    title: 'BASc in Software Engineering',
                    institution: 'University of Ottawa',
                    duration: 'Sept 2016 - Dec 2020',
                    details: [
                        'Earned an Entrance Scholarship of $3000',
                        'Won a startup pitch competition to create a innovative engineering idea and pitch the idea to a panel of judges.',
                        'Cofounder and Software Lead of the uOttawa first Electric Car Racing Team. Developed a program to run a BLDC motor for their electric vehicle and placed 4th at the Shell Eco-Marathon 2019 Americas.',
                    ]
                },
            ]
        }
    ]
    res.status(200).json({ data })
}