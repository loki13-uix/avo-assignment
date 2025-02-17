import { TreeNode } from './test-cases'

export const avoBankTree: TreeNode = {
  id: '1',
  name: 'Avo Bank',
  nodes: [
    {
      id: '1.1',
      name: 'Registration Process',
      nodes: [
        {
          id: '1.1.1',
          name: 'Creating Account',
          nodes: [
            { id: '1.1.1.1', name: 'Personal Information' },
            { id: '1.1.1.2', name: 'Identity Verification' },
            { id: '1.1.1.3', name: 'Account Type Selection' },
            { id: '1.1.1.4', name: 'Initial Deposit Setup' },
            { id: '1.1.1.5', name: 'Email Confirmation' },
            { id: '1.1.1.6', name: 'Welcome Kit Activation' },
          ],
        },
        {
          id: '1.1.2',
          name: 'Data Change',
          nodes: [
            { id: '1.1.2.1', name: 'Update Contact Details' },
            { id: '1.1.2.2', name: 'Password Reset' },
            { id: '1.1.2.3', name: 'Biometric Update' },
            { id: '1.1.2.4', name: 'Beneficiary Management' },
            { id: '1.1.2.5', name: 'Communication Preferences' },
          ],
        },
      ],
    },
    {
      id: '1.2',
      name: 'Digital Banking',
      nodes: [
        {
          id: '1.2.1',
          name: 'Mobile App Features',
          nodes: [
            { id: '1.2.1.1', name: 'Quick Balance Check' },
            { id: '1.2.1.2', name: 'Fund Transfer' },
            { id: '1.2.1.3', name: 'Bill Payments' },
            { id: '1.2.1.4', name: 'Card Controls' },
          ],
        },
        {
          id: '1.2.2',
          name: 'Security Center',
          nodes: [
            { id: '1.2.2.1', name: 'Two-Factor Authentication' },
            { id: '1.2.2.2', name: 'Device Management' },
            { id: '1.2.2.3', name: 'Activity Logs' },
          ],
        },
      ],
    },
    {
      id: '1.3',
      name: 'Loan Services',
      nodes: [
        {
          id: '1.3.1',
          name: 'Personal Loans',
          nodes: [
            { id: '1.3.1.1', name: 'Application Portal' },
            { id: '1.3.1.2', name: 'Document Upload' },
            { id: '1.3.1.3', name: 'EMI Calculator' },
          ],
        },
        {
          id: '1.3.2',
          name: 'Mortgage',
          nodes: [
            { id: '1.3.2.1', name: 'Property Valuation' },
            { id: '1.3.2.2', name: 'Approval Workflow' },
            { id: '1.3.2.3', name: 'Disbursement Tracking' },
          ],
        },
      ],
    },
    {
      id: '1.4',
      name: 'Customer Support',
      nodes: [
        {
          id: '1.4.1',
          name: 'Help Desk',
          nodes: [
            { id: '1.4.1.1', name: 'Live Chat' },
            { id: '1.4.1.2', name: 'Service Tickets' },
            { id: '1.4.1.3', name: 'Callback Requests' },
          ],
        },
        {
          id: '1.4.2',
          name: 'Self-Service',
          nodes: [
            { id: '1.4.2.1', name: 'FAQ Database' },
            { id: '1.4.2.2', name: 'Video Tutorials' },
            { id: '1.4.2.3', name: 'System Status' },
          ],
        },
      ],
    },
    {
      id: '1.5',
      name: 'Fraud Prevention',
      nodes: [
        {
          id: '1.5.1',
          name: 'Monitoring',
          nodes: [
            { id: '1.5.1.1', name: 'Transaction Alerts' },
            { id: '1.5.1.2', name: 'Suspicious Activity Reports' },
          ],
        },
        {
          id: '1.5.2',
          name: 'Controls',
          nodes: [
            { id: '1.5.2.1', name: 'Spending Limits' },
            { id: '1.5.2.2', name: 'International Use Settings' },
            { id: '1.5.2.3', name: 'Account Freeze' },
          ],
        },
      ],
    },
    {
      id: '1.6',
      name: 'Wealth Management',
      nodes: [
        {
          id: '1.6.1',
          name: 'Investments',
          nodes: [
            { id: '1.6.1.1', name: 'Portfolio Dashboard' },
            { id: '1.6.1.2', name: 'Risk Assessment' },
          ],
        },
        {
          id: '1.6.2',
          name: 'Retirement Planning',
          nodes: [
            { id: '1.6.2.1', name: 'Pension Calculator' },
            { id: '1.6.2.2', name: 'Withdrawal Strategies' },
          ],
        },
      ],
    },
  ],
}
