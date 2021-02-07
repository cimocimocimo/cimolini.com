<template>
  <Layout>

    <address class="bg-white px-3 py-1.5 shadow-md leading-6">
      <div v-html="markdown($page.strapiContactInfo.mailing_address)" />
      <p>
        <a :href="'mailto:' + $page.strapiContactInfo.email">{{ $page.strapiContactInfo.email }}</a><br>
        <a :href="'tel:+1' + $page.strapiContactInfo.phone">{{ formatPhone($page.strapiContactInfo.phone) }}</a><br>
      </p>
    </address>

    <section>
      <h2>Objective</h2>
      <p>Should be a title and a paragraph or two of text. Also should be targeted at an employer or client and fetched using a key.</p>
    </section>

    <section>
      <h2>Qualifications</h2>
      <p>Word salad of technologies and general qualifications. Title/abbreviation with a very short description. Link to applicable experience/education?</p>
    </section>

    <section>
      <h2>Education</h2>
      <div v-for="edu in $page.allStrapiEducation.edges" :key="edu.node.id">
        {{ edu.node.institution }}<br>
        {{ edu.node.program }}<br>
        {{ edu.node.credential }}<br>
        {{ edu.node.text }}<br>

        <ul>
          <li v-for="hl in edu.node.highlights" :key="hl.id">
            {{ hl.text }}
          </li>
        </ul>

        <div>
          {{ edu.node.dates.start }} - {{ edu.node.dates.end }}
        </div>
      </div>

    </section>

    <section>
      <h2>Experience</h2>
      <p>Similar to Education, date range, company/client, descripion, highlights.</p>
    </section>

    <section>
      <h2>References</h2>
      <p>Some content.</p>
    </section>

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
</style>

<page-query>
  query {
  strapiContactInfo(id:1) {
  mailing_address
  email
  phone
  }
  allStrapiEducation {
  edges {
  node {
  id
  institution
  program
  credential
  text
  highlights {
  id
  text
  }
  dates {
  id
  start
  end
  }
  }
  }
  }
  }
</page-query>
