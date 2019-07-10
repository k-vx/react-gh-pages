from flask import Blueprint, render_template, request

from flaskblog.models import Solution, SolutionCategory

solutions = Blueprint('solutions', __name__)

@solutions.route('/solutions')
def solutions_all():
    page = request.args.get('page', 1, type=int)
    solutions = Solution.query.order_by(Solution.id.asc()).paginate(page=page, per_page=20)
    solution_categories = SolutionCategory.query.all()
    return render_template('solutions/solutions.html', solutions=solutions, solution_categories=solution_categories)


@solutions.route('/solutions/<string:category>')
def solutions_by_category(category):
    page = request.args.get('page', 1, type=int)
    category = SolutionCategory.query.filter_by(name=category).first_or_404()
    solutions = Solution.query.filter_by(category=category).order_by(Solution.sub_id.asc()).paginate(page=page, per_page=20)
    solution_categories = SolutionCategory.query.all()
    return render_template('solutions/solutions.html', solutions=solutions, solution_categories=solution_categories, category=category)

@solutions.route('/solutions/<int:solution_id>')
def solution(solution_id):
    solution = Solution.query.get_or_404(solution_id)
    return render_template('solutions/solution.html', title=solution.title, solution=solution)
