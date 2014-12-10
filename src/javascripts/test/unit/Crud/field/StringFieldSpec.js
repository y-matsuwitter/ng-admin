/*global define,angular,inject,describe,it,expect,beforeEach*/

define(function (require) {
    'use strict';

    describe('directive: string-field', function() {
        var Field = require('ng-admin/Main/component/service/config/Field');
        var testapp = angular.module('testapp', []);
        testapp.directive('inputField', require('ng-admin/Crud/field/InputField'));
        testapp.directive('stringField', require('ng-admin/Crud/field/StringField'));
        require('angular-mocks');

        var $compile,
            scope,
            directiveUsage = '<string-field field="field" value="value"></string-field>';

        beforeEach(module('testapp'));

        beforeEach(inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            scope = _$rootScope_;
        }));

        it("should contain an input tag of type text", function() {
            scope.field = new Field();
            var element = $compile(directiveUsage)(scope);
            scope.$digest();
            expect(element.children()[0].nodeName).toBe('INPUT');
            expect(element.children()[0].type).toBe('text');
        });

        it("should contain the field classes", function() {
            scope.field = new Field().cssClasses(['foo', 'bar']);
            var element = $compile(directiveUsage)(scope);
            scope.$digest();
            var classList = element.children()[0].classList;
            expect(classList.contains('foo')).toBeTruthy();
            expect(classList.contains('bar')).toBeTruthy();
        });

        it("should contain the bounded value", function() {
            scope.field = new Field();
            scope.value= "foobar";
            var element = $compile(directiveUsage)(scope);
            scope.$digest();
            expect(element.find('input').val()).toBe('foobar');
            scope.value= "baz";
            scope.$digest();
            expect(element.find('input').val()).toBe('baz');
        });

    });
});
