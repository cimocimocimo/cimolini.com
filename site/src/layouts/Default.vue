<template>
  <div class="layout">
    <header class="z-50 p-6 leading-none fixed w-screen bg-white flex flex-row justify-between items-center shadow-lg">
      <g-link class="p-2 font-bold" to="/">{{ $static.metadata.siteName }}</g-link>
      <nav class="nav">
        <g-link class="ml-2 p-2" to="/about/">About</g-link>
        <g-link class="ml-2 p-2" to="/contact">Contact</g-link>
      </nav>
    </header>
    <main class="z-10 pt-28 p-8">
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
