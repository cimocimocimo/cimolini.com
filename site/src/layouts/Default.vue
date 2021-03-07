<template>
  <div class="layout">
    <header class="layout__header">
      <g-link class="p-3 font-bold" to="/">{{ $static.metadata.siteName }}</g-link>
      <nav class="nav">
        <g-link class="p-3" to="/about/">About</g-link>
        <g-link class="p-3" to="/contact">Contact</g-link>
      </nav>
    </header>
    <main class="z-10 pt-19 p-3">
      <slot/>
    </main>
    <footer class="z-20">
      Footer
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  name: 'Layout',
}
</script>
