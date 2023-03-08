exports.homepage = async (req, res) => {
    res.status(404).render('index', {
        title: 'Home',
    });
};
// exports.homepage = async (req, res) => {
//     res.write(`<script>alert('what')</script>`)
// };
