export type DomainId = 'cloud-concepts' | 'architecture' | 'management';

export interface Domain {
  id: DomainId;
  label: string;
  short: string;
}

export interface BuddyExplanation {
  whyWrong: string;
  analogy: string;
  trap: string;
  followUp: string;
}

export interface Question {
  id: number;
  domain: DomainId;
  prompt: string;
  options: string[];
  correctIndex: number;
  buddy: BuddyExplanation;
  tip?: string;
}

export const domains: Domain[] = [
  { id: 'cloud-concepts', label: 'Cloud Concepts', short: 'Cloud Concepts' },
  { id: 'architecture', label: 'Architecture & Services', short: 'Architecture' },
  { id: 'management', label: 'Management & Governance', short: 'Management' },
];

export const questions: Question[] = [
  {
    id: 1,
    domain: 'cloud-concepts',
    prompt:
      'A startup wants to run a website that occasionally goes viral, with traffic spiking unpredictably. Which cloud benefit is most directly relevant to handling this without overpaying during quiet periods?',
    options: [
      'High Availability across regions',
      'Elasticity that scales resources to match demand',
      'Disaster Recovery with geo-replication',
      'Fixed monthly reserved capacity planning',
    ],
    correctIndex: 1,
    buddy: {
      whyWrong:
        'High Availability is about staying online when something breaks, not about growing or shrinking with traffic. Disaster Recovery is about bouncing back after a failure. Reserved capacity is the opposite of what you want here — it locks you into a fixed size.',
      analogy:
        'Think of elasticity like a stretchy pair of pants versus a fixed belt. On a big meal day (traffic spike) the fabric expands; on a light day it shrinks back. Reserved capacity is a custom-tailored suit — it looks great but only fits one size.',
      trap:
        'The keywords "spiking unpredictably" and "without overpaying during quiet periods" are the trigger. Anytime a question pairs unpredictable demand with cost control, the answer is almost always elasticity or scalability.',
      followUp:
        'Good follow-up! Scalability and elasticity are cousins: scalability means the system *can* grow to handle more load, while elasticity means it *automatically* grows and shrinks with demand. For a viral website you want both, but elasticity is the one that saves you money.',
    },
  },
  {
    id: 2,
    domain: 'cloud-concepts',
    prompt:
      'Which of the following best describes the "shared responsibility" model for an Azure virtual machine (IaaS)?',
    options: [
      'Microsoft is responsible for the OS patches and your application code',
      'Microsoft handles the physical infrastructure; you handle the OS, patches, and app',
      'You are responsible only for the data, and Microsoft runs everything else',
      'Microsoft and you equally split every responsibility 50/50',
    ],
    correctIndex: 1,
    buddy: {
      whyWrong:
        'In IaaS, Microsoft does NOT patch your operating system for you — that is your job. Option C describes more of a SaaS model. Option D sounds fair but is wrong: responsibilities are not split evenly, they are divided by a clear line.',
      analogy:
        'Imagine renting an empty apartment (IaaS). The landlord fixes the building, plumbing, and electricity (physical infrastructure). But you furnish it, clean it, and replace the lightbulbs (OS, patches, app). In a hotel (SaaS), the staff even makes your bed — you just show up.',
      trap:
        'When you see "virtual machine" or "IaaS" in a shared-responsibility question, remember the dividing line sits at the operating system. Microsoft stops at the hypervisor; everything above it is yours.',
      followUp:
        'Great question! The line moves depending on the service model. IaaS: you own from the OS up. PaaS (like Azure SQL): you own data and access, Microsoft owns the OS and runtime. SaaS (like Microsoft 365): you only own your data and who can see it.',
    },
  },
  {
    id: 3,
    domain: 'architecture',
    prompt:
      'You need to host a simple marketing webpage that is mostly static HTML, CSS, and a few images, with the lowest possible maintenance overhead. Which Azure service is the best fit?',
    options: [
      'Azure Virtual Machines',
      'Azure Kubernetes Service (AKS)',
      'Azure Blob Storage with static website hosting',
      'Azure SQL Database',
    ],
    correctIndex: 2,
    buddy: {
      whyWrong:
        'A Virtual Machine is overkill — you would manage the OS, web server, and patches just for some HTML. AKS is for orchestrating containers across many services, far too heavy here. Azure SQL is a database; it cannot serve a webpage at all.',
      analogy:
        'Serving a static site from Blob Storage is like handing out printed flyers from a box on your porch. Setting up a VM is like building a whole house just to store the flyer box. Keep it simple — use the box.',
      trap:
        'The phrase "mostly static" plus "lowest maintenance" is the trigger. Static content plus low maintenance almost always points to Blob Storage static website hosting or Azure Static Web Apps.',
      followUp:
        'Nice follow-up! Azure Static Web Apps is another great option and adds a free CI/CD pipeline plus custom domains. Blob Storage is the absolute minimum and cheapest, but Static Web Apps is friendlier if you expect the site to grow into an app later.',
    },
  },
  {
    id: 4,
    domain: 'architecture',
    prompt:
      'Your team is building a microservices application where each service should scale independently and be fully serverless (no infrastructure to manage). Which compute option fits best?',
    options: [
      'Azure Functions',
      'Azure Virtual Machine Scale Sets',
      'Azure Blob Storage',
      'Azure Virtual Network',
    ],
    correctIndex: 0,
    buddy: {
      whyWrong:
        'VM Scale Sets still require you to manage the OS image, patches, and runtime — that is not serverless. Blob Storage is for files, not compute. A Virtual Network is for connectivity, not a place to run code.',
      analogy:
        'Azure Functions are like calling a taxi: you only pay while the ride happens, and you never think about maintaining the car. VM Scale Sets are like owning a fleet of cars — powerful, but you handle oil changes and repairs.',
      trap:
        'The keyword "serverless" combined with "no infrastructure to manage" is the strongest signal. On the AZ-900, serverless compute almost always means Azure Functions.',
      followUp:
        'Good one! Azure Container Apps is a newer option that also feels serverless but runs containers. For pure event-driven microservices, Functions is the classic exam answer; Container Apps is the modern choice when you want to bring your own container.',
    },
  },
  {
    id: 5,
    domain: 'management',
    prompt:
      'You want to receive a text message when your monthly Azure spending crosses a certain threshold. Which tool should you use?',
    options: [
      'Azure Advisor',
      'Azure Cost Management budgets with alerts',
      'Azure Service Health',
      'Azure Monitor Logs',
    ],
    correctIndex: 1,
    buddy: {
      whyWrong:
        'Azure Advisor gives general best-practice recommendations, not spend alerts. Service Health tells you about Azure outages, not your bill. Monitor Logs tracks telemetry and performance, not budget thresholds.',
      analogy:
        'Cost Management budgets are like a low-balance alert on your bank account — when spending hits the line you set, it pings you. Advisor is more like a financial advisor suggesting better habits; useful, but it does not text you in real time.',
      trap:
        'Anytime a question mentions spending limits, cost thresholds, or budget alerts, the answer is Azure Cost Management (often with the word "budgets"). Watch for the trigger words "spending" and "threshold".',
      followUp:
        'Smart question! You can route budget alerts to email, webhook, Logic App, or even SMS through an Action Group paired with the alert. The exam usually keeps it simple though — just remember Cost Management + budgets = alerts.',
    },
  },
  {
    id: 6,
    domain: 'management',
    prompt:
      'A company wants to ensure that no resources are ever deployed into the wrong Azure region, and every resource must carry a department tag. Which governance feature enforces these rules automatically?',
    options: [
      'Azure Policy',
      'Azure Blueprints (legacy)',
      'Azure Role-Based Access Control (RBAC)',
      'Azure Resource Manager templates only',
    ],
    correctIndex: 0,
    buddy: {
      whyWrong:
        'RBAC controls WHO can act, not WHERE or WHAT they can deploy — it is about permissions, not rules. An ARM template deploys resources but does not enforce rules on future deployments. Blueprints packages policies and templates, but Policy is the engine that actually evaluates and blocks non-compliant resources.',
      analogy:
        'Azure Policy is like a bouncer at a club checking the dress code at the door — if you are not on the list (no department tag) or in the wrong city, you simply do not get in. RBAC is the guest list itself; Policy is the rule enforced at the entrance.',
      trap:
        'The phrases "ensure that" and "enforces automatically" are the giveaways. When the question is about forcing compliance (tags, regions, allowed VM sizes), the answer is Azure Policy.',
      followUp:
        'Good follow-up! Policy can operate in two modes: Audit (just logs violations) or Deny (blocks the deployment). For real enforcement you want Deny. Policy also has an initiative, which is a bundle of related policies — like a "compliance starter pack".',
    },
  },
];
