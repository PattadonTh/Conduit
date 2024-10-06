<template>
    <v-footer app>
        <v-container fluid>
            <v-row justify="space-between" align="center">
                <v-col cols="auto">
                    <a href="/" class="logo-font">Conduit</a>
                </v-col>
                <v-col cols="auto" class="text-right">
                    <span class="attribution">
                        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp;
                        design licensed under MIT.
                    </span>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'Footer',
};
</script>

<style scoped>
.logo-font {
    font-size: 12px;
    /* Font size for the logo */
    font-weight: bold;
    /* Bold font for logo */
    color: #5c6bc0;
    /* Logo color */
    text-decoration: none;
    /* Remove underline from link */
}

.attribution {
    color: #6c757d;
    /* Darker gray color for attribution text */
    margin-left: 16px;
    /* Margin for spacing */
    font-size: 12px;
}
</style>
