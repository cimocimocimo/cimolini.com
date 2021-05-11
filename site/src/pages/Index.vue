<template>
  <Layout>

    <address class="bg-white px-3 py-1.5 shadow-md leading-6">
      <div v-html="markdown($page.strapiContactInfo.mailing_address)" />
      <p>
        <a :href="'mailto:' + $page.strapiContactInfo.email">{{ $page.strapiContactInfo.email }}</a><br>
        <a :href="'tel:+1' + $page.strapiContactInfo.phone">{{ formatPhone($page.strapiContactInfo.phone) }}</a><br>
      </p>
    </address>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/favicon.png" width="135" />

    <section>
      <h2>Objective</h2>
      <p>Should be a title and a paragraph or two of text. Also should be targeted at an employer or client and fetched using a key.</p>
    </section>

    <section>
      <h2>Qualifications</h2>
      <p>Word salad of technologies and general qualifications. Title/abbreviation with a very short description. Link to applicable experience/education?</p>
    </section>

    <div>
      <div v-for="{ node } in $page.experience.edges" :key="node.id">
        <h2 v-if="node.client">
          <a v-if="node.client.Website" :href="node.client.Website">
            {{ node.client.Name }}
          </a>
          <span v-else>
            {{ node.client.Name }}
          </span>
        </h2>
        <div v-if="node.client">{{ node.client.Website }}</div>
        <h2>{{ node.title }}</h2>
        <p>{{ node.text }}</p>
        <p v-if="node.date">{{ node.date.start }} - {{ node.date.end }}</p>
        <ul v-if="node.highlights">
          <li v-for="({ text }, index) in node.highlights" :key="index">
            {{ text }}
          </li>
        </ul>
      </div>
    </div>

    <section>
      <h2>Experience</h2>
      <p>Similar to Education, date range, company/client, descripion, highlights.</p>
    </section>

    <section>
      <h2>References</h2>
      <p>Some content.</p>
    </section>
    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>

  </Layout>
</template>

<script>
import marked from 'marked'

export default {
  metaInfo: {
    title: 'Resumé - Aaron Cimolini'
  },
  mounted() {
    console.log(this.$page.strapiContactInfo.mailing_address.replace(/\n/g, '<br>\n'))
  },
  methods: {
    markdown: function (md) {
      return marked(md)
    },
    formatPhone: function (numb) {
      const area = numb.slice(0, 3)
      const exch = numb.slice(3, 6)
      const line = numb.slice(6, 10)
      return `(${area}) ${exch}-${line}`
    },
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

<page-query>
  query {
  strapiContactInfo(id:1) {
  mailing_address
  email
  phone
  }
  experience: allStrapiExperience {
  edges {
  node {
  id
  title
  text
  date {
  start
  end
  }
  highlights {
  text
  }
  client {
  id
  Name
  Description
  Website
  }
  }
  }
  }
  }
</page-query>
