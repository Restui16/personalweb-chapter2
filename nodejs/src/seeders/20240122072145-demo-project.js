'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('projects', [{
      project_name: 'App Dumbways',
      start_date: new Date('2023-11-5'),
      end_date: new Date('2024-1-5'),
      description: 'Dumbways adalah aplikasi Learning Management System (LMS) yang dirancang khusus untuk Bootcamp IT, menyediakan lingkungan pembelajaran interaktif dan komprehensif bagi para peserta. Dengan fokus pada pengembangan keterampilan dan pengetahuan di bidang teknologi informasi, Dumbways memberikan pengalaman belajar yang mendalam dan efektif',
      tech: ['node-js', 'laravel', 'python', 'react'],
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: new Date(),
      updatedAt: new Date(),
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('projects', null, {});
  }
};