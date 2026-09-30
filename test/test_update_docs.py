import importlib.util, pathlib, unittest

path = pathlib.Path(__file__).parents[1] / "scripts" / "update_docs.py"
spec = importlib.util.spec_from_file_location("update_docs", path); module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)

class UpdateDocsTest(unittest.TestCase):
    def test_extracts_closing_issue_references(self):
        self.assertEqual(module.issue_numbers({"title":"Fixes #9", "body":"Closes: #2 and resolves #9"}), [2, 9])
    def test_rejects_non_markdown_or_traversal_paths(self):
        with self.assertRaises(ValueError): module.safe_output_path("../secret.md")
        with self.assertRaises(ValueError): module.safe_output_path("docs/script.py")

if __name__ == "__main__": unittest.main()
